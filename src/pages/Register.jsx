import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";

import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
//react hook form import
import {
    useForm,
} from "react-hook-form";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../components/config/firebase";

const googleProvider = new GoogleAuthProvider();


const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handeSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        console.log(form.name)
        console.log(form.email)
        console.log(form.password)
    };

    const handleRegister = async () => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                name: form.name,
                email: res.user.email,
                provider: "email",
                createdAt: new Date(),
            });

            navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            console.log(user);

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
                <form onSubmit={handleSubmit}>
                    <input

                        placeholder="Full name"
                        style={styles.input}
                        {...register("name", { required: "please enter your name" })}
                    />
                    {errors.name && <p style={{ color: "red", fontSize: "12px", textAlign: "left", marginTop: "-10px", marginBottom: "10px" }}>{errors.name.message}</p>}

                    <input

                        placeholder="Email address"
                        style={styles.input}
                        {...register("email", {
                            required: "please enter your email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <p style={{ color: "red", fontSize: "12px", textAlign: "left", marginTop: "-10px", marginBottom: "10px" }}>{errors.email.message}</p>}

                    <input

                        placeholder="Password"
                        style={styles.input}
                        {...register("password", { required: "please enter your password", minLength: { value: 8, message: "Password must be at least 8 characters long", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character" } } })}
                    />
                    {errors.password && <p style={{ color: "red", fontSize: "12px", textAlign: "left", marginTop: "-10px", marginBottom: "10px" }}>{errors.password.message}</p>}

                    <button style={styles.primaryBtn} onClick={handleRegister}>
                        Create account
                    </button>

                    <div style={styles.divider}>
                        <span>OR</span>
                    </div>

                    <button style={styles.googleBtn} onClick={signInWithGoogle}>
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
        marginBottom: "4px",
        fontSize: "22px",
        fontWeight: "600",
    },

    subtitle: {
        marginBottom: "20px",
        color: "#64748b",
        fontSize: "14px",
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
        marginTop: "6px",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#94a3b8",
        fontSize: "12px",
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
        fontSize: "14px",
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
};
