import java.net.URL
import java.nio.file.Files
import java.nio.file.StandardCopyOption

plugins {
    kotlin("android")
    kotlin("kapt")
    id("com.android.application")
}

dependencies {
    compileOnly(project(":hideapi"))

    implementation(project(":core"))
    implementation(project(":service"))
    implementation(project(":design"))
    implementation(project(":common"))

    implementation(libs.kotlin.coroutine)
    implementation(libs.androidx.core)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.fragment)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.coordinator)
    implementation(libs.androidx.recyclerview)
    implementation(libs.google.material)
    implementation(libs.quickie.bundled)
    implementation(libs.androidx.activity.ktx)
}

tasks.getByName("clean", type = Delete::class) {
    delete(file("release"))
}

val geoFilesDownloadDir = "src/main/assets"

task("downloadGeoFiles") {
    val geoFilesUrls = mapOf(
        "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.metadb" to "geoip.metadb",
        "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat" to "geosite.dat",
        "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb" to "ASN.mmdb",
    )

    doLast {
        val assetsDir = file(geoFilesDownloadDir)
        if (!assetsDir.exists()) {
            assetsDir.mkdirs()
        }

        geoFilesUrls.forEach { (downloadUrl, outputFileName) ->
            val outputFile = file("$geoFilesDownloadDir/$outputFileName")
            if (!outputFile.exists()) {
                println("Downloading $outputFileName from $downloadUrl...")
                try {
                    val url = URL(downloadUrl)
                    url.openStream().use { input ->
                        Files.copy(input, outputFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
                    }
                    println("Successfully downloaded $outputFileName")
                } catch (e: Exception) {
                    println("Failed to download $outputFileName: ${e.message}")
                }
            } else {
                println("$outputFileName already exists, skipping download.")
            }
        }
    }
}

afterEvaluate {
    val downloadGeoFilesTask = tasks["downloadGeoFiles"]

    tasks.forEach {
        if (it.name.startsWith("assemble")) {
            it.dependsOn(downloadGeoFilesTask)
        }
    }
}

// Remove the automatic deletion of assets in clean task to preserve downloaded files
/*
tasks.getByName("clean", type = Delete::class) {
    delete(file(geoFilesDownloadDir))
}
*/
