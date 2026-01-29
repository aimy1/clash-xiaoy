package com.github.kr328.clash.design

import android.content.Context
import android.view.View
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import com.github.kr328.clash.design.model.LogFile
import com.github.kr328.clash.design.ui.LogsScreen
import com.github.kr328.clash.design.ui.LogsUiState
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume

class LogsDesign(context: Context) : Design<LogsDesign.Request>(context) {
    sealed class Request {
        object StartLogcat : Request()
        object DeleteAll : Request()

        data class OpenFile(val file: LogFile) : Request()
    }

    private val _uiState = MutableStateFlow(LogsUiState())

    override val root: View = ComposeView(context).apply {
        setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
        setContent {
            val state by _uiState.collectAsState()
            LogsScreen(
                state = state,
                requests = { requests.trySend(it) }
            )
        }
    }

    suspend fun patchLogs(logs: List<LogFile>) {
        _uiState.update { it.copy(logs = logs) }
    }

    suspend fun requestDeleteAll(): Boolean {
        return withContext(Dispatchers.Main) {
            suspendCancellableCoroutine { ctx ->
                MaterialAlertDialogBuilder(context)
                    .setTitle(R.string.delete_all_logs)
                    .setMessage(R.string.delete_all_logs_warn)
                    .setPositiveButton(R.string.ok) { _, _ -> ctx.resume(true) }
                    .setNegativeButton(R.string.cancel) { _, _ -> }
                    .show()
                    .setOnDismissListener { if (!ctx.isCompleted) ctx.resume(false) }
            }
        }
    }

    init {
        // Compose handles UI
    }
}
