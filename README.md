# Cab-in

> Component to display details and amenities for each listing.

## Related Projects

  - https://github.com/bedroost/gallery
  - https://github.com/bedroost/review
  - https://github.com/bedroost/booking

## API

### Listings
| HTTP Method   | Endpoint                | Description                                       |
|:--------------|:------------------------|:--------------------------------------------------|
| GET           | /api/:listingid/details | Return details about a specific listing           |
| POST          | /api/:listingid/details | Create details for a specific listing             |
| PUT           | /api/:listingid/details | Update and replace details for a specific listing |
| DELETE        | /api/:listingid/details | Remove details for a specific listing             |

### Amenities
| HTTP Method   | Endpoint                   | Description                                         |
|:--------------|:---------------------------|:----------------------------------------------------|
| GET           | /api/:listingid/amenities  | Returns all amenities for a specific listing        |
| POST          | /api/:listingid/amenities  | Add amenities for a specific listing                |
| PUT           | /api/:listingid/amenities  | Update and replace amenities for a specific listing |
| DELETE        | /api/:listingid/amenities  | Remove amenities for a specific listing             |

### Highlights
| HTTP Method   | Endpoint                    | Description                                          |
|:--------------|:----------------------------|:-----------------------------------------------------|
| GET           | /api/:listingid/highlights  | Returns all highlights for a specific listing        |
| POST          | /api/:listingid/highlights  | Add highlights for a specific listing                |
| PUT           | /api/:listingid/highlights  | Update and replace highlights for a specific listing |
| DELETE        | /api/:listingid/highlights  | Remove highlights for a specific listing             |

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```