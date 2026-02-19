import Skeleton from "react-loading-skeleton";

function SkeletonCard() {
  return (
    <div className="bg-white h-full border border-gray-200 rounded-xl overflow-hidden gap-4 flex flex-col justify-between">
      <div className="flex items-center justify-center h-48 relative">
        <div className="w-full h-full bg-gray-100">
          <Skeleton height="100%" className="!rounded-none" containerClassName="h-full w-full block" />
        </div>
        <span className="bg-gray-100 text-black font-medium text-xs py-0.5 px-2 w-fit rounded-md overflow-hidden gap-1 justify-center items-center shrink-0 inline-flex left-3 top-3 absolute">
          <Skeleton width={60} height={12} />
        </span>
      </div>

      <div className="pb-6 p-4">
        <div className="mb-2">
          <Skeleton height={20} width="75%" />
        </div>

        <div className="text-sm mb-3">
          <Skeleton height={14} width="100%" className="mb-1" />
          <Skeleton height={14} width="85%" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Skeleton width={16} height={16} />
            <Skeleton height={14} width={160} />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Skeleton width={16} height={16} />
            <Skeleton height={14} width={140} />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Skeleton width={16} height={16} />
            <Skeleton height={14} width={120} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center p-4 pt-0">
        <Skeleton height={36} className="!rounded-md" />
      </div>
    </div>
  );
}

export default SkeletonCard;