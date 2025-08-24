    "use client";
    import CardNav from "@/components/Components/CardNav/CardNav";
    import { navigationItems } from "@/app/config/navigation";


    export default function Header() {
    return (
        <header className="relative">
        <CardNav
            logo="/logo2.png"
            logoAlt="Company Logo"
            items={navigationItems}
            baseColor="#ffffff"
            menuColor="#1f2937"
            buttonBgColor="#059669"
            buttonTextColor="#ffffff"
            ease="power3.out"
            className="shadow-lg backdrop-blur-sm bg-white/95"
        />
        </header>
    );
    }
