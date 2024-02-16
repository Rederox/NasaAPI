// Interface principale pour la recherche d'images
export interface ImagesSearch {
    collection: {
        href: string;
        items: Item[];
        links: CollectionLink[];
        metadata: {
            total_hits: number;
        };
        version: string;
    };
}

// Interface pour chaque item dans la collection d'images
interface Item {
    data: ItemData[];
    href: string;
    links: ItemLink[];
}

// Interface pour les données de chaque image/item
interface ItemData {
    center: string;
    date_created: string;
    description: string;
    keywords: string[];
    media_type: string;
    nasa_id: string;
    title: string;
}

// Interface pour les liens associés à chaque image/item
interface ItemLink {
    href: string;
    rel: string;
    render: string;
}

// Interface pour les liens au niveau de la collection
interface CollectionLink {
    href: string;
    prompt: string;
    rel: string;
}