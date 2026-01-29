package com.github.kr328.clash.design.ui

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.github.kr328.clash.core.model.TunnelState
import com.github.kr328.clash.design.MainDesign

import android.util.Log
import androidx.compose.ui.res.stringResource
import com.github.kr328.clash.design.R

// Cyberpunk Theme Colors
val CyberBlack = Color(0xFF050505)
val CyberDark = Color(0xFF121212)
val NeonCyan = Color(0xFF00F0FF)
val NeonRed = Color(0xFFFF2A6D)
val NeonPurple = Color(0xFF7000FF)
val TextWhite = Color(0xFFEEEEEE)
val TextGray = Color(0xFF888888)

@Composable
fun DashboardScreen(
    state: DashboardState,
    onRequest: (MainDesign.Request) -> Unit
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
                        imageVector = Icons.Rounded.Bolt,
                        contentDescription = null,
                        tint = NeonCyan
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = stringResource(R.string.launch_name_meta).uppercase(),
                        color = TextWhite,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 2.sp
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    // Status Indicator
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(if (state.isRunning) NeonCyan else Color.Gray)
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
                // 1. Status Card
                item {
                    StatusCard(state, onRequest)
                }

                // 2. Mode Selector
                item {
                    ModeSelector(state.mode, onRequest)
                }

                // 3. Function Grid
                item {
                    FunctionGrid(state, onRequest)
                }
                
                item {
                    Spacer(modifier = Modifier.height(32.dp))
                }
            }
        }
    }
}

@Composable
fun StatusCard(state: DashboardState, onRequest: (MainDesign.Request) -> Unit) {
    val isRunning = state.isRunning
    val cardColor by animateColorAsState(if (isRunning) NeonCyan.copy(alpha = 0.1f) else CyberDark, label = "cardColor")
    val borderColor by animateColorAsState(if (isRunning) NeonCyan else Color.DarkGray, label = "borderColor")
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(180.dp)
            .clickable { onRequest(MainDesign.Request.ToggleStatus) },
        colors = CardDefaults.cardColors(containerColor = cardColor),
        shape = RoundedCornerShape(24.dp),
        border = BorderStroke(1.dp, borderColor)
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            // Background Decoration
            Canvas(modifier = Modifier.fillMaxSize()) {
                drawCircle(
                    brush = Brush.radialGradient(
                        colors = listOf((if(isRunning) NeonCyan else Color.Gray).copy(alpha = 0.1f), Color.Transparent)
                    ),
                    radius = size.width / 1.5f,
                    center = center
                )
            }
            
            Column(
                modifier = Modifier.align(Alignment.Center),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                val scale by animateFloatAsState(if (isRunning) 1.1f else 1f, label = "scale")
                Icon(
                    imageVector = Icons.Rounded.PowerSettingsNew,
                    contentDescription = "Toggle",
                    modifier = Modifier
                        .size(64.dp)
                        .scale(scale),
                    tint = if (isRunning) NeonCyan else TextGray
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = if (isRunning) stringResource(R.string.running).uppercase() else stringResource(R.string.stopped).uppercase(),
                    color = TextWhite,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = state.trafficInfo,
                    color = if (isRunning) NeonCyan else TextGray,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 12.sp
                )
            }
        }
    }
}

@Composable
fun ModeSelector(mode: TunnelState.Mode, onRequest: (MainDesign.Request) -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(CyberDark, RoundedCornerShape(12.dp))
            .padding(4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        TunnelState.Mode.values().forEach { m ->
            val isSelected = m == mode
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .clickable { 
                        Log.d("MODE", "UI click: ${m.name}")
                        onRequest(MainDesign.Request.SetMode(m)) 
                    }
                    .background(if (isSelected) Color(0xFF252525) else Color.Transparent)
                    .padding(vertical = 12.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = m.name.uppercase(),
                    color = if (isSelected) TextWhite else TextGray,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

@Composable
fun FunctionGrid(state: DashboardState, onRequest: (MainDesign.Request) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            // Proxy
            GridCard(
                modifier = Modifier.weight(1f),
                icon = Icons.Rounded.Dns,
                title = stringResource(R.string.proxy),
                subtitle = state.mode.name,
                onClick = { onRequest(MainDesign.Request.OpenProxy) }
            )
            // Profiles
            GridCard(
                modifier = Modifier.weight(1f),
                icon = Icons.Rounded.ListAlt,
                title = stringResource(R.string.profiles),
                subtitle = state.profileName ?: stringResource(R.string.not_selected),
                onClick = { onRequest(MainDesign.Request.OpenProfiles) }
            )
        }
        
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            // Providers or Logs
            if (state.hasProviders) {
                GridCard(
                    modifier = Modifier.weight(1f),
                    icon = Icons.Rounded.Extension,
                    title = stringResource(R.string.providers),
                    subtitle = stringResource(R.string.detail),
                    onClick = { onRequest(MainDesign.Request.OpenProviders) }
                )
            } else {
                 GridCard(
                    modifier = Modifier.weight(1f),
                    icon = Icons.Rounded.History,
                    title = stringResource(R.string.logs),
                    subtitle = stringResource(R.string.detail),
                    onClick = { onRequest(MainDesign.Request.OpenLogs) }
                )
            }
            // Settings
            GridCard(
                modifier = Modifier.weight(1f),
                icon = Icons.Rounded.Settings,
                title = stringResource(R.string.settings),
                subtitle = stringResource(R.string.detail),
                onClick = { onRequest(MainDesign.Request.OpenSettings) }
            )
        }
    }
}

@Composable
fun GridCard(
    modifier: Modifier = Modifier,
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit
) {
    Card(
        modifier = modifier
            .height(100.dp)
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = CyberDark),
        shape = RoundedCornerShape(16.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Icon(imageVector = icon, contentDescription = title, tint = TextGray)
            Column {
                Text(text = title, color = TextWhite, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Text(text = subtitle, color = TextGray, fontSize = 10.sp, maxLines = 1)
            }
        }
    }
}
