"use client";

import { useEffect } from "react";
import { recordCocktailView } from "@/src/lib/favourites&views/views";

type RecordViewProps = {
  cocktailId: number;
};

const RecordView = ({ cocktailId }: RecordViewProps) => {
  useEffect(() => {
    recordCocktailView(cocktailId);
  }, [cocktailId]);

  return null;
};

export default RecordView;
