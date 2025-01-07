export interface ActionResponse {
    success: boolean;
    message: string;
    error?: Record<string, string[]>;
    input?: {
        email: string;
        password: string;
        repeatPassword: string;
    };
}

export interface ActionResponseWithoutRepeatPassword {
    success: boolean;
    message: string;
    error?: Record<string, string[]>;
    input?: {
        email: string;
        password: string;
    };
}