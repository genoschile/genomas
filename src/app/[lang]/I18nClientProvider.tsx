"use client"

import React, { createContext, useContext } from "react"
import { TranslationKey, TranslationParams } from "./layout"
import { createTranslator } from "./api"

const I18nContext = createContext<{
    t: (key: TranslationKey, params?: TranslationParams) => string
} | null>(null)

export function I18nClientProvider ({
    children,
    dictionary
}: {
    children: React.ReactNode,
    dictionary: Record<string, string>
}) {
    return (
        <I18nContext.Provider value={{t: createTranslator(dictionary)}}>
            {children}
        </I18nContext.Provider>
    )
}

export function useTranslations() {
    const context = useContext(I18nContext)

    if (!context) {
        throw new Error ("useTranslationERRor")
    }

    return context
}