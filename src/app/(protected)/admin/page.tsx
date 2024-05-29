import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Files, Users } from "lucide-react";
import { Overview } from "./_components/overview";
import { getUsersCount } from "@/data/user";
import {
  getDocsCount,
  getDocsCountForLastMonth,
  getLatestDocs,
} from "@/data/doc";
import { RecentDocuments } from "./_components/recent-docs";

const AdminPage = async () => {
  const { usersCount, docsCount, latestDocs, docsCountForLastMonth } =
    await getData();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2 rtl:flex-row-reverse">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Documets
                  </CardTitle>
                  <Files className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{docsCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{usersCount}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle className="rtl:text-right">Recent Documents</CardTitle>
                  <CardDescription>
                    You made {docsCountForLastMonth} sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentDocuments documents={latestDocs} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default AdminPage;

const getData = async () => {
  const usersCount = await getUsersCount();
  const docsCount = await getDocsCount();
  const latestDocs = await getLatestDocs();
  const docsCountForLastMonth = getDocsCountForLastMonth();
  return {
    usersCount,
    docsCount,
    latestDocs,
    docsCountForLastMonth,
  };
};
