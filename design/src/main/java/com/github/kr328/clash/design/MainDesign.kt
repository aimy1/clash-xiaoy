package com.github.kr328.clash.design

import android.content.Context
import android.view.View
import androidx.appcompat.app.AlertDialog
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import com.github.kr328.clash.core.model.TunnelState
import com.github.kr328.clash.core.util.trafficTotal
import com.github.kr328.clash.design.databinding.DesignAboutBinding
import com.github.kr328.clash.design.ui.DashboardScreen
import com.github.kr328.clash.design.ui.DashboardState
import com.github.kr328.clash.design.util.layoutInflater
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.withContext

class MainDesign(context: Context) : Design<MainDesign.Request>(context) {
    sealed interface Request {
        object ToggleStatus : Request
        object OpenProxy : Request
        object OpenProfiles : Request
        object OpenProviders : Request
        object OpenLogs : Request
        object OpenSettings : Request
        object OpenHelp : Request
        object OpenAbout : Request
        data class SetMode(val mode: TunnelState.Mode) : Request
    }

    private val _uiState = MutableStateFlow(DashboardState())

    override val root: View = ComposeView(context).apply {
        setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
        setContent {
            val state by _uiState.collectAsState()
            DashboardScreen(
                state = state,
                onRequest = { request(it) }
            )
        }
    }

    suspend fun setProfileName(name: String?) {
        _uiState.update { it.copy(profileName = name) }
    }

    suspend fun setClashRunning(running: Boolean) {
        _uiState.update { it.copy(isRunning = running) }
    }

    suspend fun setForwarded(value: Long) {
        val formatted = value.trafficTotal()
        _uiState.update { it.copy(trafficInfo = formatted) }
    }

    suspend fun setMode(mode: TunnelState.Mode) {
        _uiState.update { it.copy(mode = mode) }
    }

    suspend fun setHasProviders(has: Boolean) {
        _uiState.update { it.copy(hasProviders = has) }
    }

    suspend fun showAbout(versionName: String) {
        withContext(Dispatchers.Main) {
            val binding = DesignAboutBinding.inflate(context.layoutInflater).apply {
                this.versionName = versionName
            }

            AlertDialog.Builder(context)
                .setView(binding.root)
                .show()
        }
    }

    init {
        // Compose handles theming internally
    }

    fun request(request: Request) {
        requests.trySend(request)
    }
}
