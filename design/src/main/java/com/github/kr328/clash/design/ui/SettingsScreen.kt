package com.github.kr328.clash.design.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Dns
import androidx.compose.material.icons.rounded.Extension
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material.icons.rounded.Widgets
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.github.kr328.clash.design.SettingsDesign

import androidx.compose.ui.res.stringResource
import com.github.kr328.clash.design.R

@Composable
fun SettingsScreen(
    state: SettingsUiState,
    requests: (SettingsDesign.Request) -> Unit
) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            background = CyberBlack,
            surface = CyberDark,
            primary = NeonCyan
        )
    ) {
        Scaffold(
            containerColor = CyberBlack,
            topBar = {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                        .statusBarsPadding(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Rounded.Settings,
                        contentDescription = null,
                        tint = NeonCyan
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = stringResource(R.string.settings).uppercase(),
                        color = TextWhite,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 2.sp
                    )
                }
            }
        ) { padding ->
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    SettingItemCard(
                        icon = Icons.Rounded.Settings,
                        title = stringResource(R.string.app),
                        subtitle = stringResource(R.string.settings_app_subtitle),
                        onClick = { requests(SettingsDesign.Request.StartApp) }
                    )
                }
                
                item {
                    SettingItemCard(
                        icon = Icons.Rounded.Dns,
                        title = stringResource(R.string.network),
                        subtitle = stringResource(R.string.settings_network_subtitle),
                        onClick = { requests(SettingsDesign.Request.StartNetwork) }
                    )
                }
                
                item {
                    SettingItemCard(
                        icon = Icons.Rounded.Extension,
                        title = stringResource(R.string.override),
                        subtitle = stringResource(R.string.settings_override_subtitle),
                        onClick = { requests(SettingsDesign.Request.StartOverride) }
                    )
                }
                
                item {
                    SettingItemCard(
                        icon = Icons.Rounded.Widgets,
                        title = stringResource(R.string.meta_features),
                        subtitle = stringResource(R.string.settings_meta_subtitle),
                        onClick = { requests(SettingsDesign.Request.StartMetaFeature) }
                    )
                }
            }
        }
    }
}

@Composable
fun SettingItemCard(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = CyberDark),
        shape = RoundedCornerShape(12.dp),
        border = BorderStroke(1.dp, Color(0xFF222222))
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = NeonCyan
            )
            Spacer(modifier = Modifier.width(20.dp))
            Column {
                Text(
                    text = title,
                    color = TextWhite,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 16.sp
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = subtitle,
                    color = TextGray,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 12.sp
                )
            }
        }
    }
}
