type Props = {
  params: { id: string };
};

export default function LinkDetail({ params }: Props) {
  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold">Link {params.id}</h2>
      <p className="mt-2 text-sm text-muted-foreground">Details for link {params.id}.</p>
    </div>
  );
}
