export const revalidate = 60;
import { DrupalService } from "@/services";
import TaskforceDetailScreen from "./screen";
import slugify from "slugify";

const TaskforceDetailPage = async ({
  params,
}: {
  params: { slug: string | string[] };
}) => {
  const resolvedParams = await params;

  const slugParam = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[resolvedParams.slug.length - 1]
    : resolvedParams.slug;

  const taskSubPages = await DrupalService.getTaskforcesSubpages();

  const matchedTaskforces =
    taskSubPages?.filter((taskforce) => {
      const title = (taskforce as any)?.title;

      if (!title) {
        return false;
      }

      return slugify(title, { lower: true, strict: true }) === slugParam;
    }) ?? [];

  if (matchedTaskforces.length === 0) {
    return null;
  }

  return (
    <TaskforceDetailScreen
      cardDetails={matchedTaskforces[0]}
      displayType="NEWS"
    />
  );
};

export default TaskforceDetailPage;
