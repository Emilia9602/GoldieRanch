import DesktopNavbar from "./DesktopNavbar";
import MobileNavigation from "./MobileNavigation";

export default function Navbar() {
    return (
        <>
            <div className="hidden md:block">
                <DesktopNavbar />
            </div>

            <div className="md:hidden">
                <MobileNavigation />
            </div>
        </>
    )
}