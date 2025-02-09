import Blogs from "@/components/created-components/Blogs";
import Title from "@/components/created-components/Title";

export default function Page() {
  return (
    <div className="w-full">
      <Title title="All Blogs" />
      <div className="w-full">
        <Blogs/>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'