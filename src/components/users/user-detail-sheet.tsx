"use client";

import { useQuery } from "@tanstack/react-query";
import type { ComponentType, ReactNode } from "react";
import {
  Building2,
  CreditCard,
  GraduationCap,
  Landmark,
  Mail,
  Phone,
  Ruler,
  ShoppingCart,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fullName } from "@/lib/analytics";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import {
  fetchUserById,
  fetchUserCarts,
  fetchUserPosts,
  fetchUserTodos,
} from "@/services/users.api"

const roleStyles = {
  admin:
    "border-red-500/20 bg-red-500/10 text-red-500",

  moderator:
    "border-amber-500/20 bg-amber-500/10 text-amber-500",

  user:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
};

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="bg-muted flex size-8 items-center justify-center rounded-lg ring-1 ring-border">
          <Icon
            className="text-muted-foreground size-4"
            aria-hidden
          />
        </span>

        <h3 className="text-sm font-semibold tracking-tight">
          {title}
        </h3>
      </div>

      <div className="grid gap-4 rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide">
        {label}
      </p>

      <div className="text-sm font-semibold tracking-tight break-words">
        {value}
      </div>
    </div>
  );
}

export function UserDetailSheet({
  userId,
  open,
  onOpenChange,
}: {
  userId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const enabled = open && userId != null;

  const uid = userId ?? 0;

  const userQuery = useQuery({
    queryKey: queryKeys.user(uid),
    queryFn: () => fetchUserById(userId!),
    enabled: Boolean(enabled && userId),
  });

  const postsQuery = useQuery({
    queryKey: queryKeys.userPosts(uid),
    queryFn: () => fetchUserPosts(userId!),
    enabled: Boolean(enabled && userId),
  });

  const todosQuery = useQuery({
    queryKey: queryKeys.userTodos(uid),
    queryFn: () => fetchUserTodos(userId!),
    enabled: Boolean(enabled && userId),
  });

  const cartsQuery = useQuery({
    queryKey: queryKeys.userCarts(uid),
    queryFn: () => fetchUserCarts(userId!),
    enabled: Boolean(enabled && userId),
  });

  const user = userQuery.data;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        showCloseButton
        className="flex w-full flex-col gap-0 border-l border-border/80 bg-background/95 p-0 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:max-w-xl lg:max-w-2xl"
      >
        <SheetHeader className="border-b border-border/80 bg-gradient-to-b from-muted/40 to-background px-6 py-6">
          {userQuery.isLoading ? (
            <div className="flex gap-4">
              <Skeleton className="size-20 shrink-0 rounded-2xl" />

              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          ) : userQuery.error ? (
            <>
              <SheetTitle className="text-destructive">
                Unable to load user
              </SheetTitle>

              <SheetDescription>
                The profile could not be fetched.
                Try again in a moment.
              </SheetDescription>
            </>
          ) : user ? (
            <>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="relative">
                  <Avatar className="size-24 rounded-2xl ring-4 ring-background shadow-2xl">
                    <AvatarImage
                      src={user.image}
                      alt=""
                      className="object-cover"
                    />

                    <AvatarFallback className="rounded-2xl text-lg font-semibold">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                    #{user.id}
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <SheetTitle className="text-xl font-semibold tracking-tight">
                      {fullName(user)}
                    </SheetTitle>

                    <SheetDescription className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="rounded-full capitalize"
                      >
                        {user.gender}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full border font-medium capitalize",
                          roleStyles[
                            user.role as keyof typeof roleStyles
                          ]
                        )}
                      >
                        {user.role}
                      </Badge>

                      <span className="text-muted-foreground text-xs">
                        @{user.username}
                      </span>
                    </SheetDescription>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                      {user.company.title}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-full font-normal"
                    >
                      {user.company.department}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </SheetHeader>

        <ScrollArea className="flex-1 overscroll-contain">
          <div className="space-y-8 px-6 py-6">
            {user ? (
              <>
                <DetailSection
                  title="Personal information"
                  icon={User}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Email"
                      value={user.email}
                    />

                    <Field
                      label="Phone"
                      value={user.phone}
                    />

                    <Field
                      label="Birth date"
                      value={user.birthDate}
                    />

                    <Field
                      label="Age"
                      value={`${user.age} years`}
                    />

                    <Field
                      label="Blood group"
                      value={user.bloodGroup}
                    />

                    <Field
                      label="Eye color"
                      value={user.eyeColor}
                    />
                  </div>

                  <Separator className="my-2 bg-border/80" />

                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full bg-background px-2 py-1 ring-1 ring-border">
                      <Mail className="size-3.5" />
                      Primary contact
                    </span>

                    <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full bg-background px-2 py-1 ring-1 ring-border">
                      <Phone className="size-3.5" />
                      Verified voice
                    </span>
                  </div>
                </DetailSection>

                <DetailSection
                  title="Company information"
                  icon={Building2}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Employer"
                      value={user.company.name}
                    />

                    <Field
                      label="Title"
                      value={user.company.title}
                    />

                    <Field
                      label="Department"
                      value={user.company.department}
                    />
                  </div>

                  <Separator className="my-3 bg-border/80" />

                  <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                    Office address
                  </p>

                  <p className="text-sm leading-relaxed">
                    {user.company.address.address},{" "}
                    {user.company.address.city},{" "}
                    {user.company.address.state}{" "}
                    {user.company.address.postalCode},{" "}
                    {user.company.address.country}
                  </p>
                </DetailSection>

                <DetailSection
                  title="Home address"
                  icon={Landmark}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Street"
                      value={user.address.address}
                    />

                    <Field
                      label="City"
                      value={user.address.city}
                    />

                    <Field
                      label="State"
                      value={user.address.state}
                    />

                    <Field
                      label="Postal code"
                      value={user.address.postalCode}
                    />

                    <Field
                      label="Country"
                      value={user.address.country}
                    />
                  </div>
                </DetailSection>

                <Tabs
                  defaultValue="posts"
                  className="gap-5"
                >
                  <TabsList
                    variant="line"
                    className="w-full justify-start rounded-xl bg-muted/40 p-1"
                  >
                    <TabsTrigger value="posts">
                      Posts
                    </TabsTrigger>

                    <TabsTrigger value="todos">
                      Todos
                    </TabsTrigger>

                    <TabsTrigger value="carts">
                      Carts
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="posts"
                    className="space-y-3"
                  >
                    <Card className="shadow-sm ring-1 ring-border/60">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                          Published posts
                        </CardTitle>

                        <CardDescription>
                          Pulled from{" "}
                          <code className="text-xs">
                            /users/{user.id}/posts
                          </code>
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        {postsQuery.isLoading ? (
  <Skeleton className="h-24 w-full rounded-lg" />
) : postsQuery.data?.posts.length ? (
  postsQuery.data.posts.map((p) => (
    <div
      key={p.id}
      className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
    >
      <p className="font-medium leading-snug">
        {p.title}
      </p>

      <p className="text-muted-foreground mt-2 line-clamp-3 text-xs leading-relaxed">
        {p.body}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Badge
            key={t}
            variant="outline"
            className="rounded-full text-[10px] font-normal"
          >
            #{t}
          </Badge>
        ))}
      </div>
    </div>
  ))
) : (
  <p className="text-muted-foreground text-sm">
    No posts for this profile.
  </p>
)}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : null}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}