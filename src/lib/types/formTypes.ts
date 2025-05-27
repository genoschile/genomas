export interface ActionResponse {
    success: boolean;
    message: string;
    error?: Record<string, string[]>;
    data?: {
        id: string;
        email: string;
        name: string | null;
        isDefaultAdmin: boolean;
        userType: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    input?: {
        email: string;
        password: string;
        repeatPassword: string;
    };
}

export interface ActionResponseWithoutRepeatPassword {
    success: boolean;
    message: string;
    data?: {
        id: string;
        email: string;
        name: string ;
        isDefaultAdmin: boolean;
        userType: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
    }
    error?: Record<string, string[]>;
    input?: {
        email: string;
        password: string;
    };
}