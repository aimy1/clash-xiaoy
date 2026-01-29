package com.github.kr328.clash.design.ui

import com.github.kr328.clash.core.model.TunnelState

data class DashboardState(
    val isRunning: Boolean = false,
    val trafficInfo: String = "0 B/s",
    val mode: TunnelState.Mode = TunnelState.Mode.Rule,
    val profileName: String? = null,
    val hasProviders: Boolean = false,
    val versionName: String = ""
)
