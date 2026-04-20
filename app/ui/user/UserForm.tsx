// app/ui/user/UserForm.tsx
import { logoutAction } from '../../lib/user/logout';

interface FormInput {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
}

interface UserFormProps {
    title: string;
    subtitle: string;
    inputs: FormInput[];
    action: (formData: FormData) => Promise<void>;
    buttonLabel: string;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
    isLoggedIn?: boolean;
    userEmail?: string;
}

export default function UserForm({
    title,
    subtitle,
    inputs,
    action,
    buttonLabel,
    footerText,
    footerLinkText,
    footerLinkHref,
    isLoggedIn,
    userEmail
}: UserFormProps) {
    if (isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-vh-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-amber-100">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-amber-900">Already Logged In</h1>
                        <p className="mt-2 text-amber-700">You are currently signed in as <span className="font-semibold">{userEmail}</span>.</p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <p className="text-center text-amber-900">Would you like to log out and signed in with a different account?</p>
                        
                        <form action={logoutAction}>
                            <button
                                type="submit"
                                className="w-full py-3 mt-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Log Out
                            </button>
                        </form>
                        
                        <a 
                            href="/spaces" 
                            className="block w-full py-3 text-center font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-vh-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-amber-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-amber-900">{title}</h1>
                    <p className="mt-2 text-amber-700">{subtitle}</p>
                </div>

                <form className="space-y-4">
                    {inputs.map((input) => (
                        <div key={input.name}>
                            <label className="block text-sm font-medium text-amber-900 mb-1">
                                {input.label}
                            </label>
                            <input
                                name={input.name}
                                type={input.type}
                                required={input.required}
                                className="w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
                                placeholder={input.placeholder}
                            />
                        </div>
                    ))}

                    <button
                        formAction={action}
                        className="w-full py-3 mt-6 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {buttonLabel}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-amber-700">{footerText} </span>
                    <a href={footerLinkHref} className="font-semibold text-amber-600 hover:text-amber-800 transition-colors">
                        {footerLinkText}
                    </a>
                </div>
            </div>
        </div>
    );
}