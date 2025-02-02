'use client'

import * as React from 'react'
import { FileText, Settings, User, Video, ChartArea } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Progress } from '@/components/ui/progress'

export default function AppSidebar() {
  const totalVideos = 3
  const currentVideos = 2

  return (
    <div>
      <Sidebar className="hidden md:flex w-64">
        <SidebarHeader>
          <h2 className="px-4 py-4 text-xl font-bold font-serif">AXOVA</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 px-6 py-3 text-base">
                <a href="/dashboard/videos" className="flex items-center">
                  <Video className="mr-3 h-5 w-5" />
                  <span>My Videos</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 px-6 py-3 text-base">
                <a href="/dashboard/settings" className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 px-6 py-3 text-base">
                <a href="/dashboard/analytics" className="flex items-center">
                  <ChartArea className="mr-3 h-5 w-5" />
                  <span>Analytics</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 px-6 py-3 text-base">
                <a href="/docs" className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  <span>Docs</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-6 py-2 mb-2">
                <p className="text-xs mb-2">Video Limit: {currentVideos}/{totalVideos}</p>
                <Progress value={(currentVideos / totalVideos) * 100} className="w-auto h-1" />
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 px-6 py-3 text-base">
                <a href="#profile" className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  <span>Profile</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      </div>
  )
}