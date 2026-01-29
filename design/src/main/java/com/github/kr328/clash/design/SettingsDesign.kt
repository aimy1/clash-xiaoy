package com.github.kr328.clash.design

import android.content.Context
import android.view.View
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import com.github.kr328.clash.design.ui.SettingsScreen
import com.github.kr328.clash.design.ui.SettingsUiState
import kotlinx.coroutines.flow.MutableStateFlow

class SettingsDesign(context: Context) : Design<SettingsDesign.Request>(context) {
    enum class Request {
        StartApp, StartNetwork, StartOverride, StartMetaFeature,
    }

    private val _uiState = MutableStateFlow(SettingsUiState())

    override val root: View = ComposeView(context).apply {
        setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
        setContent {
            val state by _uiState.collectAsState()
            SettingsScreen(
                state = state,
                requests = { request(it) }
            )
        }
    }

    init {
        // Compose handles UI
    }

    fun request(request: Request) {
        requests.trySend(request)
    }
}
