package com.github.kr328.clash.design.ui

import com.github.kr328.clash.service.model.Profile

data class ProfilesUiState(
    val profiles: List<Profile> = emptyList(),
    val isAllUpdating: Boolean = false
)
