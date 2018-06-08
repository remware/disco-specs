
'use strict';


var popular = [
    { "is_automated": false, "name": "if", "is_trusted": false, "is_official": true, "star_count": 1300, "description": "Redis is an open source key-value store that functions as a data structure server." },
    { "is_automated": false, "name": "else", "is_trusted": false, "is_official": true, "star_count": 2600, "description": "Ubuntu is a Debian-based Linux operating system based on free software." },
    { "is_automated": false, "name": "type", "is_trusted": false, "is_official": true, "star_count": 582, "description": "The WordPress rich content management system can utilize plugins, widgets, and themes." },
    { "is_automated": false, "name": "real", "is_trusted": false, "is_official": true, "star_count": 1300, "description": "MySQL is a widely used, open-source relational database management system (RDBMS)." },
    { "is_automated": false, "name": "integer", "is_trusted": false, "is_official": true, "star_count": 1100, "description": "MongoDB document databases provide high availability and easy scalability." },
    { "is_automated": false, "name": "boolean", "is_trusted": false, "is_official": true, "star_count": 1600, "description": "The official build of CentOS." },
    { "is_automated": false, "name": "node", "is_trusted": false, "is_official": true, "star_count": 1200, "description": "Node.js is a JavaScript-based platform for server-side and networking applications." },
    { "is_automated": false, "name": "nginx", "is_trusted": false, "is_official": true, "star_count": 1600, "description": "Official build of Nginx." },
    { "is_automated": false, "name": "postgres", "is_trusted": false, "is_official": true, "star_count": 1200, "description": "The PostgreSQL object-relational database system provides reliability and data integrity." },
    { "is_automated": true, "name": "microsoft/aspnet", "is_trusted": true, "is_official": false, "star_count": 277, "description": "ASP.NET is an open source server-side Web application framework" }
];

export interface IHubSearchResponseResult {
    is_automated: boolean;
    name: string;
    is_trusted: boolean;
    is_official: boolean;
    star_count: number;
    description: string;
}

export function searchKeywordsInRegistryHub(prefix: string, cache: boolean): Promise<IHubSearchResponseResult[]> {
    if (prefix.length === 0) {       
        // right after typing the keyword and ':' (e.g. 'image:').
        return Promise.resolve(popular.slice(0));
    }
    var results = popular.filter(function(element) {
        return element.name > prefix;  });
       
    return Promise.resolve(results);

    
}