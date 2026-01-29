package com.github.kr328.clash.design.ui

import com.github.kr328.clash.design.model.LogFile

data class LogsUiState(
    val logs: List<LogFile> = emptyList()
)
