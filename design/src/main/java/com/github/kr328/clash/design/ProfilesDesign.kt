package com.github.kr328.clash.design

import android.app.Dialog
import android.content.Context
import android.view.View
import android.view.ViewGroup
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import com.github.kr328.clash.design.databinding.DialogProfilesMenuBinding
import com.github.kr328.clash.design.dialog.AppBottomSheetDialog
import com.github.kr328.clash.design.ui.ProfilesScreen
import com.github.kr328.clash.design.ui.ProfilesUiState
import com.github.kr328.clash.design.ui.ToastDuration
import com.github.kr328.clash.design.util.layoutInflater
import com.github.kr328.clash.service.model.Profile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.withContext

class ProfilesDesign(context: Context) : Design<ProfilesDesign.Request>(context) {
    sealed class Request {
        object UpdateAll : Request()
        object Create : Request()
        data class Active(val profile: Profile) : Request()
        data class Update(val profile: Profile) : Request()
        data class Edit(val profile: Profile) : Request()
        data class Duplicate(val profile: Profile) : Request()
        data class Delete(val profile: Profile) : Request()
    }

    private val _uiState = MutableStateFlow(ProfilesUiState())

    override val root: View = ComposeView(context).apply {
        setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
        setContent {
            val state by _uiState.collectAsState()
            ProfilesScreen(
                state = state,
                requests = { requests.trySend(it) },
                onShowMenu = { showMenu(it) }
            )
        }
    }

    suspend fun patchProfiles(profiles: List<Profile>) {
        _uiState.update { it.copy(profiles = profiles) }
    }

    suspend fun requestSave(profile: Profile) {
        showToast(R.string.active_unsaved_tips, ToastDuration.Long) {
            setAction(R.string.edit) {
                requests.trySend(Request.Edit(profile))
            }
        }
    }

    fun updateElapsed() {
        // In Compose, relative time is calculated in UI or we can force refresh state
        // Since Profile object has updatedAt, and we format it in UI.
        // If we want real-time update of "Just now" -> "1m ago", we need to trigger recomposition.
        // We can just re-emit the same profiles to trigger update if needed, or rely on internal ticker in Compose (not implemented yet).
        // For now, let's just trigger a state update with same content to force redraw if needed, 
        // but Compose is smart enough to avoid redraw if data equals.
        // So we might need a separate "now" timestamp in state if we want strict updates.
        // But for "minutes ago", strict updates are not critical.
        // Let's ignore for now or implement a global ticker in Compose later.
    }

    private fun showMenu(profile: Profile) {
        val dialog = AppBottomSheetDialog(context)

        val binding = DialogProfilesMenuBinding
            .inflate(context.layoutInflater, dialog.window?.decorView as ViewGroup?, false)

        binding.master = this
        binding.self = dialog
        binding.profile = profile

        dialog.setContentView(binding.root)
        dialog.show()
    }

    fun requestUpdateAll() {
        _uiState.update { it.copy(isAllUpdating = true) }
        requests.trySend(Request.UpdateAll)
    }

    fun finishUpdateAll() {
        _uiState.update { it.copy(isAllUpdating = false) }
    }

    fun requestCreate() {
        requests.trySend(Request.Create)
    }

    private fun requestActive(profile: Profile) {
        requests.trySend(Request.Active(profile))
    }

    fun requestUpdate(dialog: Dialog, profile: Profile) {
        requests.trySend(Request.Update(profile))
        dialog.dismiss()
    }

    fun requestEdit(dialog: Dialog, profile: Profile) {
        requests.trySend(Request.Edit(profile))
        dialog.dismiss()
    }

    fun requestDuplicate(dialog: Dialog, profile: Profile) {
        requests.trySend(Request.Duplicate(profile))
        dialog.dismiss()
    }

    fun requestDelete(dialog: Dialog, profile: Profile) {
        requests.trySend(Request.Delete(profile))
        dialog.dismiss()
    }
}
