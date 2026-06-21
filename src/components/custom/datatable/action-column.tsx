import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteConfirmationDialog } from "../elements/destructive-alert";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RowActionsProps<T extends { id: number; name: string }> {
  item: T;
  resource: string;
  remove: (id: number) => Promise<T>;
}

export function RowActions<T extends { id: number; name: string }>({
  item,
  resource,
  remove,
}: RowActionsProps<T>) {
  const { id, name } = item;
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: deleteResource } = useMutation({
    mutationFn: remove,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [resource],
      }),
  });
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu dir={i18n.dir()}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>{t("operation")}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() =>
              navigate({
                to: `/${resource}/${id}/edit`,
              })
            }
          >
            <Edit className="ml-2 size-4" />
            {t("edit")}
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="ml-2 size-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`#${name}`}
        loading={isPending}
        onConfirm={() => deleteResource(id)}
      />
    </>
  );
}
