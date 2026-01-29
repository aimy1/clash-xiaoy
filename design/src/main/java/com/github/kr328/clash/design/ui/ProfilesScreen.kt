package com.github.kr328.clash.design.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.github.kr328.clash.design.ProfilesDesign
import com.github.kr328.clash.service.model.Profile
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun ProfilesScreen(
    state: ProfilesUiState,
    requests: (ProfilesDesign.Request) -> Unit,
    onShowMenu: (Profile) -> Unit
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
                        imageVector = Icons.Rounded.ListAlt,
                        contentDescription = null,
                        tint = NeonCyan
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "PROFILES",
                        color = TextWhite,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 2.sp
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    
                    // Update All Button
                    if (state.profiles.any { it.imported && it.type != Profile.Type.File }) {
                        val rotation by animateFloatAsState(
                            targetValue = if (state.isAllUpdating) 360f else 0f,
                            animationSpec = tween(durationMillis = 1000)
                        )
                        IconButton(onClick = { requests(ProfilesDesign.Request.UpdateAll) }) {
                            if (state.isAllUpdating) {
                                CircularProgressIndicator(
                                    modifier = Modifier.size(24.dp),
                                    color = NeonCyan,
                                    strokeWidth = 2.dp
                                )
                            } else {
                                Icon(
                                    imageVector = Icons.Rounded.Sync,
                                    contentDescription = "Update All",
                                    tint = TextWhite,
                                    modifier = Modifier.rotate(rotation)
                                )
                            }
                        }
                    }

                    // Add Button
                    IconButton(onClick = { requests(ProfilesDesign.Request.Create) }) {
                        Icon(
                            imageVector = Icons.Rounded.Add,
                            contentDescription = "Add Profile",
                            tint = NeonCyan
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
                if (state.profiles.isEmpty()) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(200.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "NO PROFILES",
                                color = TextGray,
                                fontFamily = FontFamily.Monospace
                            )
                        }
                    }
                } else {
                    items(state.profiles, key = { it.uuid }) { profile ->
                        ProfileCard(
                            profile = profile,
                            onClick = { requests(ProfilesDesign.Request.Active(profile)) },
                            onMenuClick = { onShowMenu(profile) }
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
fun ProfileCard(
    profile: Profile,
    onClick: () -> Unit,
    onMenuClick: () -> Unit
) {
    val isActive = profile.active
    val cardColor = if (isActive) NeonCyan.copy(alpha = 0.1f) else CyberDark
    val borderColor = if (isActive) NeonCyan else Color.Transparent

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = cardColor),
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, borderColor)
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Status Indicator
            Box(
                modifier = Modifier
                    .size(4.dp, 40.dp)
                    .clip(RoundedCornerShape(2.dp))
                    .background(if (isActive) NeonCyan else Color.Gray)
            )
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = profile.name,
                    color = TextWhite,
                    fontWeight = FontWeight.Bold,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 16.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(modifier = Modifier.height(4.dp))
                
                // Details Row
                Row(verticalAlignment = Alignment.CenterVertically) {
                    TypeTag(profile.type)
                    Spacer(modifier = Modifier.width(8.dp))
                    if (profile.updatedAt > 0) {
                        Text(
                            text = formatRelativeTime(profile.updatedAt),
                            color = TextGray,
                            fontSize = 10.sp,
                            fontFamily = FontFamily.Monospace
                        )
                    }
                }
            }
            
            IconButton(onClick = onMenuClick) {
                Icon(
                    imageVector = Icons.Rounded.MoreVert,
                    contentDescription = "Menu",
                    tint = TextGray
                )
            }
        }
    }
}

@Composable
fun TypeTag(type: Profile.Type) {
    val (label, color) = when (type) {
        Profile.Type.File -> "FILE" to Color(0xFFFFA000)
        Profile.Type.Url -> "URL" to Color(0xFF2979FF)
        Profile.Type.External -> "EXT" to Color(0xFF7C4DFF)
    }
    
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(4.dp))
            .background(color.copy(alpha = 0.2f))
            .padding(horizontal = 6.dp, vertical = 2.dp)
    ) {
        Text(
            text = label,
            color = color,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold,
            fontFamily = FontFamily.Monospace
        )
    }
}

fun formatRelativeTime(time: Long): String {
    val diff = System.currentTimeMillis() - time
    return when {
        diff < 60000 -> "Just now"
        diff < 3600000 -> "${diff / 60000}m ago"
        diff < 86400000 -> "${diff / 3600000}h ago"
        else -> SimpleDateFormat("MM-dd", Locale.getDefault()).format(Date(time))
    }
}
