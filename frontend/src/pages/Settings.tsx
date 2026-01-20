import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Bell,
    Shield,
    CreditCard,
    Palette,
    Globe,
    Smartphone,
    LogOut,
    Mail,
    Phone,
    MapPin,
    Check,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

const Settings = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: "",
        email: "",
        bio: "",
        phone: ""
    });
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        transactions: true,
        marketing: false,
        security: true
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const decoded: any = jwtDecode(token);
                const userId = decoded.sub;

                const res = await api.get(`/accounts/${userId}`);
                if (res.data && res.data.user) {
                    setUser({
                        name: res.data.user.name || "",
                        email: res.data.user.email || "",
                        bio: "Passionate about financial freedom.", // Mock fallback
                        phone: "+1 (555) 000-0000" // Mock fallback
                    });
                }
            } catch (error) {
                console.error("Error fetching user settings:", error);
                toast.error("Failed to load user profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleSaveProfile = () => {
        // Limitation: No backend endpoint to update user details
        toast.success("Profile updated successfully (Simulation)");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        toast.success("Logged out successfully");
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-6xl mx-auto">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                        <TabsTrigger value="profile" className="gap-2 py-3">
                            <User className="h-4 w-4" />
                            <span className="hidden md:inline">Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2 py-3">
                            <Bell className="h-4 w-4" />
                            <span className="hidden md:inline">Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-2 py-3">
                            <Shield className="h-4 w-4" />
                            <span className="hidden md:inline">Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="gap-2 py-3">
                            <CreditCard className="h-4 w-4" />
                            <span className="hidden md:inline">Billing</span>
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="gap-2 py-3">
                            <Palette className="h-4 w-4" />
                            <span className="hidden md:inline">Appearance</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your photo and personal details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="flex flex-col items-center gap-4">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <Button variant="outline" size="sm">Change Avatar</Button>
                                    </div>
                                    <div className="flex-1 w-full grid gap-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="name"
                                                        value={user.name}
                                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                        className="pl-9"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="email"
                                                        value={user.email}
                                                        disabled
                                                        className="pl-9 bg-muted"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="phone"
                                                        value={user.phone}
                                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                                        className="pl-9"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input id="location" defaultValue="New York, USA" className="pl-9" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={user.bio}
                                                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                                className="resize-none h-32"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button variant="outline" onClick={() => navigate("/dashboard")}>Cancel</Button>
                                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Choose what you want to be notified about.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Email Notifications</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Mail className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Marketing Emails</p>
                                                    <p className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={notifications.marketing}
                                                onCheckedChange={(c) => setNotifications({ ...notifications, marketing: c })}
                                            />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                    <Shield className="h-5 w-5 text-red-500" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Security Alerts</p>
                                                    <p className="text-sm text-muted-foreground">Receive emails about your account security.</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={notifications.security}
                                                onCheckedChange={(c) => setNotifications({ ...notifications, security: c })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your password and security sessions.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Current Password</Label>
                                        <Input type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>New Password</Label>
                                        <Input type="password" />
                                    </div>
                                    <Button onClick={() => toast.info("Password update simulated")}>Update Password</Button>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">Logout of all sessions</h3>
                                        <p className="text-sm text-muted-foreground">Log out of all other active sessions securely.</p>
                                    </div>
                                    <Button variant="destructive" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Log Out</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Two-Factor Authentication</CardTitle>
                                <CardDescription>Add an extra layer of security to your account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Check className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">2FA is enabled</p>
                                            <p className="text-sm text-muted-foreground">Your account is protected with 2FA</p>
                                        </div>
                                    </div>
                                    <Button variant="outline">Configure</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Plan</CardTitle>
                                <CardDescription>Manage your subscription (Mock)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-bold">Pro Plan</h3>
                                            <Badge>Active</Badge>
                                        </div>
                                        <p className="text-muted-foreground">$29/month • Renews on Jul 20, 2024</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline">Cancel</Button>
                                        <Button>Upgrade</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme</CardTitle>
                                <CardDescription>Choose your preferred color theme</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                                    >
                                        <div className="h-20 rounded-lg bg-white border border-gray-200 mb-3" />
                                        <p className="font-medium text-sm">Light</p>
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary' : 'border-border hover:border-primary/50'}`}
                                    >
                                        <div className="h-20 rounded-lg bg-zinc-900 border border-zinc-700 mb-3" />
                                        <p className="font-medium text-sm">Dark</p>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Settings;