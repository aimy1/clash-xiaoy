package com.github.kr328.clash.design.ui

import com.github.kr328.clash.core.model.Proxy
import com.github.kr328.clash.core.model.TunnelState

data class ProxyUiState(
    val groupNames: List<String> = emptyList(),
    val groups: Map<Int, GroupUiState> = emptyMap(),
    val overrideMode: TunnelState.Mode? = null
)

data class GroupUiState(
    val proxies: List<Proxy> = emptyList(),
    val type: Proxy.Type = Proxy.Type.Unknown,
    val now: String = "",
    val urlTesting: Boolean = false,
    val selectable: Boolean = false
)
