/**
 * 
 * @param {string} navPos - Current position of the navbar
 * @returns {React.SFC} - Returns the specific component to the navigation position.
 */

import React from "react";

import FavoritesIcebreaker from "../Content/FavoritesIcebreaker";
import SuggestIcebreaker from "../Content/SuggestIcebreaker";
import VoteIcebreaker from "../Content/VoteIcebreaker";

export const loungeIcebreakerContent = (navPos) => {
    switch (navPos) {
        case "favorites":
            return <FavoritesIcebreaker />;
        case "suggest":
            return <SuggestIcebreaker />;
        case "vote":
            return <VoteIcebreaker />;
        default:
            return <p>No Icebreaker content for this link.</p>;
    }
}