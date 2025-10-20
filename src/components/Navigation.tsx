import { NavLink } from "react-router-dom";
import { Building2, LineChart, TrendingUp } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Overview", icon: TrendingUp },
    { to: "/companies", label: "Companies", icon: Building2 },
    { to: "/industries", label: "Industries", icon: LineChart },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-primary">
              Nvidra <span className="text-foreground">Dashboard</span>
            </h1>
            <div className="flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            AI Natives & Digital Partners Research
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
