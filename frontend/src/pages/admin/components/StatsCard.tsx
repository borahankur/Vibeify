import { Card, CardContent } from "@/components/ui/card"

type StatsCardProps = {
  bgColor: string
  iconColor: string
  value: string
  label: string
  icon: React.ElementType
}

const StatsCard = ({ icon: Icon, label, value, bgColor, iconColor }: StatsCardProps) => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors'>
      <CardContent className='p-6'>
        <div className='flex items-center gap-4'>
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <div>
            <p className='text-sm text-zinc-400'>{label}</p>
            <p className='text-2xl font-bold'>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard