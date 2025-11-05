    // src/pages/SignInPage.jsx
    import { useEffect, useRef, useState } from 'react';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { Link, useNavigate } from 'react-router-dom';
    import {jwtDecode} from 'jwt-decode'; // use default import

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const SignInPage = () => {
    const heroRef = useRef(null);
    const particlesRef = useRef([]);
    //   const sectionRefs = useRef([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // ✅ Initialize Google Sign-In
    useEffect(() => {
        // Load the Google script dynamically if not already loaded
        if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = initializeGoogleSignIn;
        } else {
        initializeGoogleSignIn();
        }

        function initializeGoogleSignIn() {
        /* global google */
        google.accounts.id.initialize({
            client_id: '880037968219-07np53b76bbk07n2pujiaqovu6hit4pc.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            { theme: 'outline', size: 'large', width: 300 }
        );
        }

        function handleCredentialResponse(response) {
        const decodedUser = jwtDecode(response.credential);
        console.log('Google User:', decodedUser);

        setUser(decodedUser);
        localStorage.setItem('familyUser', JSON.stringify(decodedUser));

        gsap.to('.success-checkmark', {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
        });

        setTimeout(() => {
            navigate('/');
        }, 1500);
        }
    }, [navigate]);

    // ✅ Load saved session
    useEffect(() => {
        const savedUser = localStorage.getItem('familyUser');
        if (savedUser) {
        setUser(JSON.parse(savedUser));
        }
    }, []);

    // ✅ Handle sign-out
    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem('familyUser');
        gsap.to('.user-card', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.in(1.7)',
        });
    };

    // 🎇 Particle and hero animations
    useEffect(() => {
        const createQuantumParticles = () => {
        const particles = [];
        const container = heroRef.current;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.className = 'absolute rounded-full quantum-particle';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = '0';

            container.appendChild(particle);
            particles.push(particle);
        }
        return particles;
        };

        particlesRef.current = createQuantumParticles();

        particlesRef.current.forEach((particle, i) => {
        const timeline = gsap.timeline({ repeat: -1, yoyo: true });
        timeline.to(particle, {
            opacity: Math.random() * 0.6 + 0.2,
            x: () => Math.random() * 80 - 40,
            y: () => Math.random() * 80 - 40,
            scale: () => Math.random() * 1.5 + 0.5,
            rotation: 360,
            duration: Math.random() * 3 + 2,
            ease: 'sine.inOut',
            delay: i * 0.01,
        });
        });

        const heroTl = gsap.timeline();

        heroTl
        .fromTo(
            '.quantum-field',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
        )
        .fromTo(
            '.signin-card',
            {
            scale: 0,
            rotationY: 180,
            filter: 'blur(20px)',
            },
            {
            scale: 1,
            rotationY: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'back.out(1.7)',
            },
            '-=0.5'
        )
        .fromTo(
            '.hero-content > *',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out' }
        );

        gsap.to('.floating-orb', {
        y: 20,
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { amount: 3, from: 'random' },
        });

        return () => {
        heroTl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        particlesRef.current.forEach((p) => p.remove());
        };
    }, []);



    // 🌌 UI
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Quantum Field */}
            <div className="quantum-field absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(120,119,198,0.4),_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,107,107,0.3),_transparent_50%)]"></div>
            </div>

            {/* Floating Rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 border-2 border-cyan-400/20 rounded-full animate-spin-slow floating-orb"></div>
            <div className="w-64 h-64 border-2 border-purple-400/30 rounded-full animate-spin-slow reverse floating-orb"></div>
            <div className="w-32 h-32 border-2 border-pink-400/40 rounded-full animate-spin-slow floating-orb"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
            <div className="hero-content text-center">
                <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold my-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                    Family Portal
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    Welcome to the {user ? `${user.name}` : 'Etete & Getachew'} family portal.
                    {user ? ' Access your family dashboard.' : ' Sign in to explore our quantum family tree.'}
                </p>
                </div>

                {/* Sign In Card */}
                <div className="signin-card max-w-md mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {!user ? (
                    <>
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                        👨‍👩‍👧‍👦
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Family Access</h2>
                        <p className="text-gray-300">Sign in to view family content</p>
                    </div>

                    <div id="googleSignInDiv" className="flex justify-center mb-6"></div>

                    <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/10">
                        <div className="text-xs text-gray-400 text-left space-y-1">
                        <div><span className="text-cyan-400">Client ID:</span> 880037968219...</div>
                        <div><span className="text-purple-400">Status:</span> Enabled</div>
                        <div><span className="text-green-400">Created:</span> 19 Oct 2025</div>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className="text-center">
                    <div className="success-checkmark scale-0 opacity-0 mb-4">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl">
                        ✓
                        </div>
                    </div>

                    <div className="user-card">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cyan-500">
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
                        <p className="text-gray-300 mb-2">{user.name}</p>
                        <p className="text-cyan-300 text-sm mb-6">{user.email}</p>

                        <div className="space-y-4">
                        <Link
                            to="/"
                            className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            Enter Family Portal
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="w-full border-2 border-gray-500 text-gray-300 px-6 py-3 rounded-2xl font-bold hover:bg-white/5 transform hover:scale-105 transition-all duration-300"
                        >
                            Sign Out
                        </button>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                {/* Stats */}
                <div className="mt-8 bg-black/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10 max-w-md mx-auto">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="text-cyan-300"><div className="text-xl font-bold">2</div><div className="text-xs text-gray-300">Founders</div></div>
                    <div className="text-purple-300"><div className="text-xl font-bold">5</div><div className="text-xs text-gray-300">Families</div></div>
                    <div className="text-pink-300"><div className="text-xl font-bold">9</div><div className="text-xs text-gray-300">Members</div></div>
                </div>
                </div>

                <div className="mt-8">
                <Link to="/" className="inline-flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 transition-colors duration-300">
                    <span>←</span><span>Back to Home</span>
                </Link>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
    };

    export default SignInPage;