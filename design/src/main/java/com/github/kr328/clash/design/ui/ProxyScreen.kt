package com.github.kr328.clash.design.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.github.kr328.clash.core.model.Proxy
import com.github.kr328.clash.design.ProxyDesign

@Composable
fun ProxyScreen(
    state: ProxyUiState,
    requests: (ProxyDesign.Request) -> Unit
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
                        imageVector = Icons.Rounded.Dns,
                        contentDescription = null,
                        tint = NeonCyan
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "PROXIES",
                        color = TextWhite,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 2.sp
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    // Global URL Test Button
                    IconButton(onClick = { requests(ProxyDesign.Request.ReloadAll) }) {
                        Icon(
                            imageVector = Icons.Rounded.Refresh,
                            contentDescription = "Refresh All",
                            tint = TextWhite
                        )
                    }
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
                if (state.groupNames.isEmpty()) {
                    item {
                        Box(modifier = Modifier.fillParentMaxSize(), contentAlignment = Alignment.Center) {
                            Text(text = "NO PROXY GROUPS", color = TextGray, fontFamily = FontFamily.Monospace)
                        }
                    }
                } else {
                    items(state.groupNames.size) { index ->
                        val groupName = state.groupNames[index]
                        val groupState = state.groups[index]
                        
                        if (groupState != null) {
                            ProxyGroupCard(
                                index = index,
                                name = groupName,
                                state = groupState,
                                onRequest = requests
                            )
                        } else {
                            // Loading Placeholder
                            ProxyGroupLoadingCard(groupName)
                        }
                    }
                }
                
                item {
                    Spacer(modifier = Modifier.height(32.dp))
                }
            }
        }
    }
}

@Composable
fun ProxyGroupLoadingCard(name: String) {
    Card(
        modifier = Modifier.fillMaxWidth().height(64.dp),
        colors = CardDefaults.cardColors(containerColor = CyberDark),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxSize().padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = name, color = TextWhite, fontFamily = FontFamily.Monospace)
            Spacer(modifier = Modifier.weight(1f))
            CircularProgressIndicator(modifier = Modifier.size(16.dp), color = NeonCyan, strokeWidth = 2.dp)
        }
    }
}

@Composable
fun ProxyGroupCard(
    index: Int,
    name: String,
    state: GroupUiState,
    onRequest: (ProxyDesign.Request) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }
    val rotation by animateFloatAsState(if (expanded) 180f else 0f, label = "rotation")
    val borderColor by animateColorAsState(if (expanded) NeonCyan else Color.Transparent, label = "border")

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize(),
        colors = CardDefaults.cardColors(containerColor = CyberDark),
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, borderColor)
    ) {
        Column {
            // Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { expanded = !expanded }
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = name,
                        color = TextWhite,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        fontSize = 16.sp
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = state.now.ifEmpty { "Loading..." },
                        color = if (state.now.isNotEmpty()) NeonCyan else TextGray,
                        fontFamily = FontFamily.Monospace,
                        fontSize = 12.sp,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
                
                // URL Test Button for this group
                IconButton(
                    onClick = { onRequest(ProxyDesign.Request.UrlTest(index)) },
                    modifier = Modifier.size(32.dp)
                ) {
                    if (state.urlTesting) {
                        CircularProgressIndicator(modifier = Modifier.size(16.dp), color = NeonCyan, strokeWidth = 2.dp)
                    } else {
                        Icon(
                            imageVector = Icons.Rounded.FlashOn,
                            contentDescription = "Test Latency",
                            tint = NeonRed,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }
                
                Spacer(modifier = Modifier.width(8.dp))
                
                Icon(
                    imageVector = Icons.Rounded.KeyboardArrowDown,
                    contentDescription = null,
                    tint = TextGray,
                    modifier = Modifier.rotate(rotation)
                )
            }
            
            // Content (Expanded)
            if (expanded) {
                Divider(color = Color(0xFF222222), thickness = 1.dp)
                
                // Using FlowRow-like layout with Grid
                // Since we are inside a LazyColumn, we cannot nest another lazy component easily without fixed height.
                // We will use a simple Column with Rows or a FlowLayout logic.
                // For simplicity and performance in this demo, let's use a non-lazy grid layout logic.
                
                Column(modifier = Modifier.padding(8.dp)) {
                    state.proxies.chunked(2).forEach { rowProxies ->
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            rowProxies.forEach { proxy ->
                                Box(modifier = Modifier.weight(1f)) {
                                    ProxyNodeItem(
                                        proxy = proxy,
                                        isSelected = proxy.name == state.now,
                                        isSelectable = state.selectable,
                                        onClick = { 
                                            if (state.selectable) {
                                                onRequest(ProxyDesign.Request.Select(index, proxy.name))
                                            }
                                        }
                                    )
                                }
                            }
                            if (rowProxies.size == 1) {
                                Spacer(modifier = Modifier.weight(1f))
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
        }
    }
}

@Composable
fun ProxyNodeItem(
    proxy: Proxy,
    isSelected: Boolean,
    isSelectable: Boolean,
    onClick: () -> Unit
) {
    val bgColor = if (isSelected) NeonCyan.copy(alpha = 0.15f) else Color(0xFF1A1A1A)
    val borderColor = if (isSelected) NeonCyan else Color.Transparent
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(70.dp)
            .clickable(enabled = isSelectable, onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = bgColor),
        shape = RoundedCornerShape(8.dp),
        border = BorderStroke(1.dp, borderColor)
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = proxy.title,
                    color = TextWhite,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 13.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                )
                if (proxy.subtitle.isNotEmpty()) {
                    Text(
                        text = proxy.subtitle,
                        color = TextGray,
                        fontSize = 10.sp,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
            
            Spacer(modifier = Modifier.width(8.dp))
            
            LatencyTag(proxy.delay)
        }
    }
}

@Composable
fun LatencyTag(delay: Int) {
    val color = when {
        delay == 0 -> TextGray
        delay < 0 -> NeonRed // Timeout/Error
        delay < 200 -> Color.Green
        delay < 500 -> Color.Yellow
        else -> Color.Red
    }
    
    val text = when {
        delay == 0 -> "..."
        delay < 0 -> "TIMEOUT"
        else -> "${delay}ms"
    }
    
    Text(
        text = text,
        color = color,
        fontFamily = FontFamily.Monospace,
        fontSize = 11.sp,
        fontWeight = FontWeight.Bold
    )
}
