package com.github.kr328.clash.design

import android.content.Context
import android.view.View
import android.widget.Toast
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import com.github.kr328.clash.core.model.Proxy
import com.github.kr328.clash.core.model.TunnelState
import com.github.kr328.clash.design.model.ProxyState
import com.github.kr328.clash.design.store.UiStore
import com.github.kr328.clash.design.ui.GroupUiState
import com.github.kr328.clash.design.ui.ProxyScreen
import com.github.kr328.clash.design.ui.ProxyUiState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.withContext

class ProxyDesign(
    context: Context,
    overrideMode: TunnelState.Mode?,
    groupNames: List<String>,
    uiStore: UiStore,
) : Design<ProxyDesign.Request>(context) {
    sealed class Request {
        object ReloadAll : Request()
        object ReLaunch : Request()

        data class PatchMode(val mode: TunnelState.Mode?) : Request()
        data class Reload(val index: Int) : Request()
        data class Select(val index: Int, val name: String) : Request()
        data class UrlTest(val index: Int) : Request()
    }

    private val _uiState = MutableStateFlow(
        ProxyUiState(
            groupNames = groupNames,
            overrideMode = overrideMode
        )
    )
    
    // Cache for mutable ProxyState objects from Activity to support requestRedrawVisible
    private val proxyStateCache = mutableMapOf<Int, ProxyState>()

    override val root: View = ComposeView(context).apply {
        setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
        setContent {
            val state by _uiState.collectAsState()
            ProxyScreen(
                state = state,
                requests = { requests.trySend(it) }
            )
        }
    }

    suspend fun updateGroup(
        position: Int,
        proxies: List<Proxy>,
        selectable: Boolean,
        parent: ProxyState,
        links: Map<String, ProxyState>
    ) {
        proxyStateCache[position] = parent
        
        _uiState.update { currentState ->
            val newGroups = currentState.groups.toMutableMap()
            newGroups[position] = GroupUiState(
                proxies = proxies,
                type = if (selectable) Proxy.Type.Selector else Proxy.Type.URLTest,
                now = parent.now,
                urlTesting = false,
                selectable = selectable
            )
            currentState.copy(groups = newGroups)
        }
    }

    suspend fun requestRedrawVisible() {
        _uiState.update { currentState ->
            val newGroups = currentState.groups.toMutableMap()
            proxyStateCache.forEach { (index, proxyState) ->
                val group = newGroups[index]
                if (group != null && group.now != proxyState.now) {
                    newGroups[index] = group.copy(now = proxyState.now)
                }
            }
            currentState.copy(groups = newGroups)
        }
    }

    suspend fun showModeSwitchTips() {
        withContext(Dispatchers.Main) {
            Toast.makeText(context, R.string.mode_switch_tips, Toast.LENGTH_LONG).show()
        }
    }

    init {
        // Compose handles UI
    }
}
