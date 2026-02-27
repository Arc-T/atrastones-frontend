import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useMatches } from "@tanstack/react-router";
import React from "react";

type BreadcrumbContext = { breadcrumb?: string };

function hasBreadcrumb(context: unknown): context is BreadcrumbContext {
  return (
    typeof context === "object" && context !== null && "breadcrumb" in context
  );
}

export default function AutoBreadcrumb() {
  const matches = useMatches();

  const crumbs = matches
    .filter((m) => hasBreadcrumb(m.context) && m.context.breadcrumb)
    .map((m) => ({
      label: m.context.breadcrumb!,
      to: m.pathname,
    }));

  if (!crumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <React.Fragment key={crumb.to}>
              <BreadcrumbItem>
                {last ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.to}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
