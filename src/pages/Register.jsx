import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../components/config/firebase";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    // Email + Password Register
    const handleRegister = async (data) => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                name: data.name,
                email: res.user.email,
                provider: "email",
                createdAt: new Date(),
            });

            navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    // Google Register
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;

            await setDoc(
                doc(db, "users", user.uid),
                {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    provider: "google",
                    createdAt: new Date(),
                },
                { merge: true }
            );

            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create account</h2>
                <p style={styles.subtitle}>Join us and start shopping</p>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <input
                        placeholder="Full name"
                        style={styles.input}
                        {...register("name", { required: "Please enter your name" })}
                    />
                    {errors.name && <p style={styles.error}>{errors.name.message}</p>}

                    <input
                        placeholder="Email address"
                        style={styles.input}
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email",
                            },
                        })}
                    />
                    {errors.email && <p style={styles.error}>{errors.email.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        {...register("password", {
                            required: "Please enter your password",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p style={styles.error}>{errors.password.message}</p>
                    )}

                    <button type="submit" style={styles.primaryBtn}>
                        Create account
                    </button>

                    <div style={styles.divider}>OR</div>

                    <button
                        type="button"
                        style={styles.googleBtn}
                        onClick={signInWithGoogle}
                    >
                        <FcGoogle size={18} />
                        Continue with Google
                    </button>

                    <p style={styles.footerText}>
                        Already have an account?{" "}
                        <Link to="/login" style={styles.link}>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;

// Styles
const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    },
    card: {
        width: "380px",
        padding: "28px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        textAlign: "center",
    },
    title: {
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "6px",
    },
    subtitle: {
        fontSize: "14px",
        color: "#64748b",
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        height: "42px",
        padding: "0 12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        fontSize: "14px",
        outline: "none",
    },
    primaryBtn: {
        width: "100%",
        height: "44px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "15px",
    },
    divider: {
        margin: "18px 0",
        fontSize: "12px",
        color: "#94a3b8",
    },
    googleBtn: {
        width: "100%",
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
        fontWeight: "500",
    },
    footerText: {
        marginTop: "16px",
        fontSize: "13px",
        color: "#475569",
    },
    link: {
        color: "#2563eb",
        fontWeight: "500",
        textDecoration: "none",
    },
    error: {
        color: "red",
        fontSize: "12px",
        textAlign: "left",
        marginBottom: "8px",
    },
};
