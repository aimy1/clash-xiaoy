buildscript {
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        classpath("org.jetbrains.kotlin:compose-compiler-gradle-plugin:2.1.0")
    }
}

plugins {
    kotlin("android")
    kotlin("kapt")
    id("com.android.library")
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.0"
}

android {
    buildFeatures {
        compose = true
        viewBinding = true
    }
}

dependencies {
    implementation(project(":common"))
    implementation(project(":core"))
    implementation(project(":service"))

    implementation(libs.kotlin.coroutine)
    implementation(libs.androidx.core)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.coordinator)
    implementation(libs.androidx.recyclerview)
    implementation(libs.androidx.fragment)
    implementation(libs.androidx.viewpager)
    implementation(libs.google.material)

    // Compose
    val composeBom = platform("androidx.compose:compose-bom:2024.02.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")
}
