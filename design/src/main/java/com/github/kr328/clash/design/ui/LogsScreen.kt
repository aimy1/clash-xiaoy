package com.github.kr328.clash.design.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.BugReport
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Description
import androidx.compose.material.icons.rounded.History
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.github.kr328.clash.design.LogsDesign
import com.github.kr328.clash.design.model.LogFile
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun LogsScreen(
    state: LogsUiState,
    requests: (LogsDesign.Request) -> Unit
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
                        imageVector = Icons.Rounded.History,
                        contentDescription = null,
                        tint = NeonCyan
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "LOGS",
                        color = TextWhite,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 2.sp
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    
                    // Delete All Button
                    IconButton(onClick = { requests(LogsDesign.Request.DeleteAll) }) {
                        Icon(
                            imageVector = Icons.Rounded.Delete,
                            contentDescription = "Delete All",
                            tint = NeonRed
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
                // Logcat Button
                item {
                    LogcatCard(onClick = { requests(LogsDesign.Request.StartLogcat) })
                }
                
                // History Divider
                item {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "HISTORY",
                            color = TextGray,
                            fontFamily = FontFamily.Monospace,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Divider(color = Color(0xFF222222), thickness = 1.dp)
                    }
                }
                
                if (state.logs.isEmpty()) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(100.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "NO LOGS FOUND",
                                color = TextGray,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                } else {
                    items(state.logs) { logFile ->
                        LogFileCard(
                            logFile = logFile,
                            onClick = { requests(LogsDesign.Request.OpenFile(logFile)) }
                        )
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
fun LogcatCard(onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = CyberDark),
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, NeonPurple.copy(alpha = 0.5f))
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Rounded.BugReport,
                contentDescription = null,
                tint = NeonPurple,
                modifier = Modifier.size(32.dp)
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(
                    text = "Capture Logcat",
                    color = TextWhite,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 16.sp
                )
                Text(
                    text = "Tap to start capturing system logs",
                    color = TextGray,
                    fontSize = 12.sp,
                    fontFamily = FontFamily.Monospace
                )
            }
        }
    }
}

@Composable
fun LogFileCard(
    logFile: LogFile,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = CyberDark),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Rounded.Description,
                contentDescription = null,
                tint = TextGray
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(
                    text = logFile.fileName,
                    color = TextWhite,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 14.sp
                )
                Text(
                    text = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(logFile.date),
                    color = TextGray,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 10.sp
                )
            }
        }
    }
}
