# tribemanagerapi

This is an API for an Ark Survival Evolved tribe manager application. It will include tracking dino stats for breeding, tracking generators for fill dates, tracking users and anything else I can come up with :)

It is authenticating requests using https://github.com/nmarsh92/authservice which implements discords OAuth2 Api. You can configure the authservice to check if the user is in your guild. You will need the guild Id. That way only users in your discord can use the API. Future update to Auth Service may include checking permissions to see if the user has a permission.
