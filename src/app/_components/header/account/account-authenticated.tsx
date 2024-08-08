import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ForYou } from './for-you/for-you'
import { Orders } from './orders/orders'
import { Profile } from './profile/profile'

export function AccountAuthenticated() {
  return (
    <Tabs defaultValue="forYou" className="flex min-h-full flex-col">
      <div className="h-full grow pb-16">
        <TabsContent value="forYou" className="m-0 h-full">
          <ForYou />
        </TabsContent>
        <TabsContent value="orders" className="m-0 h-full">
          <Orders />
        </TabsContent>
        <TabsContent value="profile" className="m-0 h-full">
          <Profile />
        </TabsContent>
      </div>
      <div className="sticky bottom-0">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="forYou">Para ti</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  )
}
