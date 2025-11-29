import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useContent, reloadContent } from "@/hooks/useContent";
import { Download, Upload, Save, Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";
import type { ContentConfig } from "@/types/content.types";

const ContentEditor = () => {
    const { content: initialContent } = useContent();
    const [content, setContent] = useState<ContentConfig>(initialContent);
    const [featureRequests, setFeatureRequests] = useState<Array<{ id: string, type: string, title: string, description: string, priority: string, date: string }>>([]);
    const [newRequest, setNewRequest] = useState({ type: '', title: '', description: '', priority: 'medium' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    // Simple password protection (stored in localStorage)
    const EDITOR_PASSWORD = "raou2024"; // Change this to your desired password

    useEffect(() => {
        const auth = localStorage.getItem("editor_authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (initialContent && isAuthenticated) {
            const deepCopy = JSON.parse(JSON.stringify(initialContent));
            setContent(deepCopy);
            if (deepCopy.featureRequests) {
                setFeatureRequests(deepCopy.featureRequests);
            }
        }
    }, [initialContent, isAuthenticated]);

    const handleLogin = () => {
        if (password === EDITOR_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem("editor_authenticated", "true");
            toast({
                title: "Access Granted",
                description: "You can now edit the website content.",
            });
        } else {
            toast({
                title: "Access Denied",
                description: "Incorrect password. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("editor_authenticated");
        toast({
            title: "Logged Out",
            description: "You have been logged out of the editor.",
        });
    };

    const handleSave = async () => {
        if (!content) return;

        try {
            // Merge feature requests into content before saving
            const contentToSave = {
                ...content,
                featureRequests: featureRequests
            };

            const response = await fetch('http://localhost:3001/api/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contentToSave),
            });

            if (response.ok) {
                // Reload content to update cache
                await reloadContent();

                toast({
                    title: "Content Saved",
                    description: "Your changes have been saved to the website.",
                });
            } else {
                throw new Error('Failed to save content');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast({
                title: "Save Failed",
                description: "Could not save changes to the server. Please try again or use Export.",
                variant: "destructive",
            });
        }
    };

    const handleExport = () => {
        if (!content) return;

        const dataStr = JSON.stringify(content, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "content.json";
        link.click();
        URL.revokeObjectURL(url);

        toast({
            title: "Content Exported",
            description: "Your content.json file has been downloaded. Replace the file in the public folder to apply changes.",
        });
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                setContent(imported);
                toast({
                    title: "Content Imported",
                    description: "Content has been loaded. Don't forget to export to save changes.",
                });
            } catch (error) {
                toast({
                    title: "Import Failed",
                    description: "Invalid JSON file. Please check the file format.",
                    variant: "destructive",
                });
            }
        };
        reader.readAsText(file);
    };

    const updateNestedValue = (path: string[], value: any) => {
        if (!content) return;

        const newContent = JSON.parse(JSON.stringify(content));
        let current: any = newContent;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }

        current[path[path.length - 1]] = value;
        setContent(newContent);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Content Editor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                placeholder="Enter editor password"
                            />
                        </div>
                        <Button onClick={handleLogin} className="w-full">
                            <Lock className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                            Enter the password to access the content editor.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">RAOU Content Editor</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleLogout}>
                            <Unlock className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                        <Button variant="outline" onClick={() => document.getElementById("import-file")?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            Import
                        </Button>
                        <input
                            id="import-file"
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="hidden"
                        />
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                        <Button onClick={handleExport}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold mb-2">How to Use This Editor:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Edit the content in the forms below</li>
                        <li>Click "Save" to automatically update the website</li>
                        <li>Refresh the website to see your changes immediately</li>
                        <li>Use "Export" if you want to download a backup of your content</li>
                    </ol>
                </div>

                <Tabs defaultValue="site" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-7">
                        <TabsTrigger value="site">Site Info</TabsTrigger>
                        <TabsTrigger value="home">Home Page</TabsTrigger>
                        <TabsTrigger value="about">About Page</TabsTrigger>
                        <TabsTrigger value="destinations">Destinations</TabsTrigger>
                        <TabsTrigger value="experiences">Experiences</TabsTrigger>
                        <TabsTrigger value="footer">Footer</TabsTrigger>
                        <TabsTrigger value="requests">Feature Requests</TabsTrigger>
                    </TabsList>

                    {/* Site Info Tab */}
                    <TabsContent value="site" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Site Information{content.site.name && ` - ${content.site.name}`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Site Name</Label>
                                    <Input
                                        value={content.site.name}
                                        onChange={(e) => updateNestedValue(["site", "name"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Tagline</Label>
                                    <Input
                                        value={content.site.tagline}
                                        onChange={(e) => updateNestedValue(["site", "tagline"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={content.site.description}
                                        onChange={(e) => updateNestedValue(["site", "description"], e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        value={content.site.companyInfo.email}
                                        onChange={(e) => updateNestedValue(["site", "companyInfo", "email"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        value={content.site.companyInfo.phone}
                                        onChange={(e) => updateNestedValue(["site", "companyInfo", "phone"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Instagram URL</Label>
                                    <Input
                                        value={content.site.social.instagram}
                                        onChange={(e) => updateNestedValue(["site", "social", "instagram"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Facebook URL</Label>
                                    <Input
                                        value={content.site.social.facebook}
                                        onChange={(e) => updateNestedValue(["site", "social", "facebook"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Twitter URL</Label>
                                    <Input
                                        value={content.site.social.twitter}
                                        onChange={(e) => updateNestedValue(["site", "social", "twitter"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Home Page Tab */}
                    <TabsContent value="home" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Hero Section{content.home.hero.title && ` - "${content.home.hero.title}"`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        value={content.home.hero.title}
                                        onChange={(e) => updateNestedValue(["home", "hero", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Subtitle</Label>
                                    <Input
                                        value={content.home.hero.subtitle}
                                        onChange={(e) => updateNestedValue(["home", "hero", "subtitle"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={content.home.hero.description}
                                        onChange={(e) => updateNestedValue(["home", "hero", "description"], e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <Label>Primary Button Label</Label>
                                    <Input
                                        value={content.home.hero.primaryCta.label}
                                        onChange={(e) => updateNestedValue(["home", "hero", "primaryCta", "label"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Secondary Button Label</Label>
                                    <Input
                                        value={content.home.hero.secondaryCta.label}
                                        onChange={(e) => updateNestedValue(["home", "hero", "secondaryCta", "label"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Section Titles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Who's Traveling Title</Label>
                                    <Input
                                        value={content.home.whosTraveling.title}
                                        onChange={(e) => updateNestedValue(["home", "whosTraveling", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Who's Traveling Subtitle</Label>
                                    <Input
                                        value={content.home.whosTraveling.subtitle}
                                        onChange={(e) => updateNestedValue(["home", "whosTraveling", "subtitle"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Featured Destinations Title</Label>
                                    <Input
                                        value={content.home.featuredDestinations.title}
                                        onChange={(e) => updateNestedValue(["home", "featuredDestinations", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Featured Destinations Subtitle</Label>
                                    <Input
                                        value={content.home.featuredDestinations.subtitle}
                                        onChange={(e) => updateNestedValue(["home", "featuredDestinations", "subtitle"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Final CTA Section{content.home.finalCta.title && ` - "${content.home.finalCta.title}"`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        value={content.home.finalCta.title}
                                        onChange={(e) => updateNestedValue(["home", "finalCta", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={content.home.finalCta.description}
                                        onChange={(e) => updateNestedValue(["home", "finalCta", "description"], e.target.value)}
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <Label>Button Label</Label>
                                    <Input
                                        value={content.home.finalCta.ctaLabel}
                                        onChange={(e) => updateNestedValue(["home", "finalCta", "ctaLabel"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Home Page Images */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Home Page Images</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageUploader
                                        imageName="hero-background.jpg"
                                        currentImagePath="/src/assets/hero-background.jpg"
                                    />
                                    <ImageUploader
                                        imageName="family-holidays.jpg"
                                        currentImagePath="/src/assets/family-holidays.jpg"
                                    />
                                    <ImageUploader
                                        imageName="honeymoons.jpg"
                                        currentImagePath="/src/assets/honeymoons.jpg"
                                    />
                                    <ImageUploader
                                        imageName="safari-holidays.jpg"
                                        currentImagePath="/src/assets/safari-holidays.jpg"
                                    />
                                    <ImageUploader
                                        imageName="remote-destinations.jpg"
                                        currentImagePath="/src/assets/remote-destinations.jpg"
                                    />
                                    <ImageUploader
                                        imageName="unusual-holidays.jpg"
                                        currentImagePath="/src/assets/unusual-holidays.jpg"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* About Page Tab */}
                    <TabsContent value="about" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>About Hero{content.about.hero.title && ` - "${content.about.hero.title}"`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        value={content.about.hero.title}
                                        onChange={(e) => updateNestedValue(["about", "hero", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Subtitle</Label>
                                    <Input
                                        value={content.about.hero.subtitle}
                                        onChange={(e) => updateNestedValue(["about", "hero", "subtitle"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>What We're About{content.about.whatWereAbout.title && ` - "${content.about.whatWereAbout.title}"`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {content.about.whatWereAbout.paragraphs.map((para, index) => (
                                    <div key={index}>
                                        <Label>Paragraph {index + 1}</Label>
                                        <Textarea
                                            value={para}
                                            onChange={(e) => {
                                                const newParagraphs = [...content.about.whatWereAbout.paragraphs];
                                                newParagraphs[index] = e.target.value;
                                                updateNestedValue(["about", "whatWereAbout", "paragraphs"], newParagraphs);
                                            }}
                                            rows={4}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Philosophy Values{content.about.philosophy.title && ` - "${content.about.philosophy.title}"`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {content.about.philosophy.values.map((value, index) => (
                                    <div key={index} className="border-b pb-4">
                                        <Label>Value {index + 1}: {value.title}</Label>
                                        <div className="mt-2 space-y-2">
                                            <Input
                                                placeholder="Title"
                                                value={value.title}
                                                onChange={(e) => {
                                                    const newValues = [...content.about.philosophy.values];
                                                    newValues[index].title = e.target.value;
                                                    updateNestedValue(["about", "philosophy", "values"], newValues);
                                                }}
                                            />
                                            <Textarea
                                                placeholder="Description"
                                                value={value.description}
                                                onChange={(e) => {
                                                    const newValues = [...content.about.philosophy.values];
                                                    newValues[index].description = e.target.value;
                                                    updateNestedValue(["about", "philosophy", "values"], newValues);
                                                }}
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* About Page Images */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About Page Images</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageUploader
                                        imageName="bespoke-travel.jpg"
                                        currentImagePath="/src/assets/bespoke-travel.jpg"
                                    />
                                    <ImageUploader
                                        imageName="logo.png"
                                        currentImagePath="/src/assets/logo.png"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Destinations Tab */}
                    <TabsContent value="destinations" className="space-y-4">
                        {content.destinations.map((dest, index) => (
                            <Card key={dest.slug}>
                                <CardHeader>
                                    <CardTitle>{dest.region}{dest.description && ` - ${dest.description.substring(0, 50)}...`}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>Region Name</Label>
                                        <Input
                                            value={dest.region}
                                            onChange={(e) => {
                                                const newDests = [...content.destinations];
                                                newDests[index].region = e.target.value;
                                                updateNestedValue(["destinations"], newDests);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            value={dest.description}
                                            onChange={(e) => {
                                                const newDests = [...content.destinations];
                                                newDests[index].description = e.target.value;
                                                updateNestedValue(["destinations"], newDests);
                                            }}
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <Label>Countries (comma-separated)</Label>
                                        <Input
                                            value={dest.countries.join(", ")}
                                            onChange={(e) => {
                                                const newDests = [...content.destinations];
                                                newDests[index].countries = e.target.value.split(",").map(c => c.trim());
                                                updateNestedValue(["destinations"], newDests);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Country Links (Optional)</Label>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            Customize URLs for each country. Leave blank to use placeholder pages.
                                        </p>
                                        {dest.countries.map((country) => (
                                            <div key={country} className="flex gap-2 mb-2">
                                                <Input
                                                    value={country}
                                                    disabled
                                                    className="w-1/3"
                                                />
                                                <Input
                                                    placeholder={`/destinations/${country.toLowerCase().replace(/ /g, "-")}`}
                                                    value={dest.countryLinks?.[country] || ""}
                                                    onChange={(e) => {
                                                        const newDests = [...content.destinations];
                                                        if (!newDests[index].countryLinks) {
                                                            newDests[index].countryLinks = {};
                                                        }
                                                        if (e.target.value) {
                                                            newDests[index].countryLinks![country] = e.target.value;
                                                        } else {
                                                            delete newDests[index].countryLinks![country];
                                                        }
                                                        updateNestedValue(["destinations"], newDests);
                                                    }}
                                                    className="flex-1"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    {/* Experiences Tab */}
                    <TabsContent value="experiences" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Who's Traveling Experiences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {content.experiences.who.map((exp, index) => (
                                    <div key={exp.slug} className="border-b pb-4">
                                        <Label className="text-lg font-semibold">{exp.title}</Label>
                                        <div className="mt-2 space-y-2">
                                            <Input
                                                placeholder="Title"
                                                value={exp.title}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.who];
                                                    newExps[index].title = e.target.value;
                                                    updateNestedValue(["experiences", "who"], newExps);
                                                }}
                                            />
                                            <Textarea
                                                placeholder="Short Description"
                                                value={exp.description}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.who];
                                                    newExps[index].description = e.target.value;
                                                    updateNestedValue(["experiences", "who"], newExps);
                                                }}
                                                rows={2}
                                            />
                                            <Textarea
                                                placeholder="Long Description"
                                                value={exp.longDescription}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.who];
                                                    newExps[index].longDescription = e.target.value;
                                                    updateNestedValue(["experiences", "who"], newExps);
                                                }}
                                                rows={3}
                                            />
                                            <Input
                                                placeholder="Link URL (e.g., /experiences/family)"
                                                value={exp.link || ""}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.who];
                                                    newExps[index].link = e.target.value;
                                                    updateNestedValue(["experiences", "who"], newExps);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>What Type of Holiday Experiences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {content.experiences.what.map((exp, index) => (
                                    <div key={exp.slug} className="border-b pb-4">
                                        <Label className="text-lg font-semibold">{exp.title}</Label>
                                        <div className="mt-2 space-y-2">
                                            <Input
                                                placeholder="Title"
                                                value={exp.title}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.what];
                                                    newExps[index].title = e.target.value;
                                                    updateNestedValue(["experiences", "what"], newExps);
                                                }}
                                            />
                                            <Textarea
                                                placeholder="Short Description"
                                                value={exp.description}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.what];
                                                    newExps[index].description = e.target.value;
                                                    updateNestedValue(["experiences", "what"], newExps);
                                                }}
                                                rows={2}
                                            />
                                            <Input
                                                placeholder="Link URL (e.g., /experiences/safari)"
                                                value={exp.link || ""}
                                                onChange={(e) => {
                                                    const newExps = [...content.experiences.what];
                                                    newExps[index].link = e.target.value;
                                                    updateNestedValue(["experiences", "what"], newExps);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* Footer Tab */}
                    <TabsContent value="footer" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Footer Content{content.footer.brandName && ` - "${content.footer.brandName}"`}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Brand Name</Label>
                                    <Input
                                        value={content.footer.brandName}
                                        onChange={(e) => updateNestedValue(["footer", "brandName"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={content.footer.description}
                                        onChange={(e) => updateNestedValue(["footer", "description"], e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <Label>Newsletter Title</Label>
                                    <Input
                                        value={content.footer.newsletter.title}
                                        onChange={(e) => updateNestedValue(["footer", "newsletter", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Newsletter Description</Label>
                                    <Textarea
                                        value={content.footer.newsletter.description}
                                        onChange={(e) => updateNestedValue(["footer", "newsletter", "description"], e.target.value)}
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <Label>Copyright Text</Label>
                                    <Input
                                        value={content.footer.copyright}
                                        onChange={(e) => updateNestedValue(["footer", "copyright"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Feature Requests Tab */}
                    <TabsContent value="requests" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Feature Requests & Edit Suggestions</CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Submit requests for new pages, features, or edits. These will be reviewed and incorporated in future updates.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* New Request Form */}
                                <div className="border rounded-lg p-4 bg-muted/50">
                                    <h3 className="font-semibold mb-4">Submit New Request</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Request Type</Label>
                                            <select
                                                className="w-full p-2 border rounded-md"
                                                value={newRequest.type}
                                                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
                                            >
                                                <option value="">Select type...</option>
                                                <option value="new-page">New Page (Country/Experience)</option>
                                                <option value="content-edit">Content Edit</option>
                                                <option value="new-feature">New Feature</option>
                                                <option value="bug-report">Bug Report</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label>Title</Label>
                                            <Input
                                                placeholder="Brief title for your request"
                                                value={newRequest.title}
                                                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea
                                                placeholder="Describe what you need in detail..."
                                                value={newRequest.description}
                                                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                                rows={4}
                                            />
                                        </div>
                                        <div>
                                            <Label>Priority</Label>
                                            <select
                                                className="w-full p-2 border rounded-md"
                                                value={newRequest.priority}
                                                onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                                            >
                                                <option value="low">Low - Nice to have</option>
                                                <option value="medium">Medium - Important</option>
                                                <option value="high">High - Urgent</option>
                                            </select>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                if (newRequest.type && newRequest.title && newRequest.description) {
                                                    const request = {
                                                        id: Date.now().toString(),
                                                        ...newRequest,
                                                        date: new Date().toISOString()
                                                    };
                                                    setFeatureRequests([...featureRequests, request]);
                                                    setNewRequest({ type: '', title: '', description: '', priority: 'medium' });
                                                    toast({
                                                        title: "Request Added",
                                                        description: "Your request has been added to the list.",
                                                    });
                                                } else {
                                                    toast({
                                                        title: "Missing Information",
                                                        description: "Please fill in all fields.",
                                                        variant: "destructive",
                                                    });
                                                }
                                            }}
                                            className="w-full"
                                        >
                                            Add Request
                                        </Button>
                                    </div>
                                </div>

                                {/* Requests List */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold">Submitted Requests ({featureRequests.length})</h3>
                                        {featureRequests.length > 0 && (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const dataStr = JSON.stringify(featureRequests, null, 2);
                                                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                                                    const url = URL.createObjectURL(dataBlob);
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = `feature-requests-${new Date().toISOString().split('T')[0]}.json`;
                                                    link.click();
                                                    toast({
                                                        title: "Requests Exported",
                                                        description: "Feature requests have been downloaded.",
                                                    });
                                                }}
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Export Requests
                                            </Button>
                                        )}
                                    </div>

                                    {featureRequests.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <p>No requests submitted yet.</p>
                                            <p className="text-sm mt-2">Use the form above to submit your first request.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {featureRequests.map((request) => (
                                                <Card key={request.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                                        {request.type.replace('-', ' ')}
                                                                    </span>
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${request.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                                        request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                            'bg-green-100 text-green-700'
                                                                        }`}>
                                                                        {request.priority}
                                                                    </span>
                                                                </div>
                                                                <h4 className="font-semibold mt-2">{request.title}</h4>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setFeatureRequests(featureRequests.filter(r => r.id !== request.id));
                                                                    toast({
                                                                        title: "Request Removed",
                                                                        description: "The request has been deleted.",
                                                                    });
                                                                }}
                                                            >
                                                                ×
                                                            </Button>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Submitted: {new Date(request.date).toLocaleDateString()}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ContentEditor;
