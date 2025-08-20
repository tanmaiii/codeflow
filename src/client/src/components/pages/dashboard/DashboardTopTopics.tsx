import TopTopics from '@/components/pages/topics/TopTopics';

export default function DashboardTopTopics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Top Topics</h2>
        <p className="text-muted-foreground">
          Discover the most active and engaging topics in our platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopTopics limit={5} />
        <TopTopics limit={5} sortBy="memberCount" />
      </div>
    </div>
  );
}
