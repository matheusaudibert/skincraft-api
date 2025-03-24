const axios = require("axios");
const capesService = require("./capesService");

/**
 * Service for retrieving and processing player profile information
 */
const profileService = {
  /**
   * Get a player's profile by username or UUID
   */
  async getProfileByIdentifier(identifier) {
    try {
      // Query the Laby.net API to get profile data
      const response = await axios.get(
        `https://laby.net/api/v3/user/${identifier}/profile`
      );
      const profileData = response.data;

      // Prepare the response
      const formattedProfile = {
        uuid: profileData.uuid,
        name: profileData.name,
        pose: `https://starlightskins.lunareclipse.studio/render/walking/${profileData.uuid}/full`,
        name_history: profileData.name_history.map((item) => ({
          name: item.name,
          changed_at: item.changed_at,
        })),
        textures: {},
      };

      // Process capes and add to response only if player has capes
      const formattedCapes = await this.formatCapes(
        profileData.textures.CAPE || []
      );
      if (formattedCapes.length > 0) {
        formattedProfile.textures.CAPES = formattedCapes;
      }

      // Process skins and add to response with the key "SKINS" instead of "SKIN"
      const formattedSkins = await this.formatSkins(
        profileData.textures.SKIN || []
      );
      if (formattedSkins.length > 0) {
        formattedProfile.textures.SKINS = formattedSkins;
      }

      return formattedProfile;
    } catch (error) {
      // Check if it's an API response error
      if (error.response) {
        // If the API responds with "User not found"
        if (
          error.response.data &&
          error.response.data.error === "User not found"
        ) {
          throw new Error("User not found");
        }
      }

      // Log error for debugging
      console.error("Error retrieving profile:", error.message);

      // Throw generic error for other issues
      throw new Error("Failed to retrieve profile information");
    }
  },

  /**
   * Get capes of a player by username or UUID
   */
  async getUserCapes(identifier) {
    try {
      // Query the Laby.net API to get profile data
      const response = await axios.get(
        `https://laby.net/api/v3/user/${identifier}/profile`
      );
      const profileData = response.data;

      // If player has no capes, return empty array
      const capes = profileData.textures.CAPE || [];
      if (capes.length === 0) {
        return [];
      }

      // Format capes with additional information
      const formattedCapes = await Promise.all(
        capes.map(async (cape) => {
          // Get additional cape info from our database
          const capeInfo = await capesService.getCapeByHash(cape.image_hash);

          // Get user count for this cape
          let userCount = null;
          try {
            const usersResponse = await axios.get(
              `https://laby.net/api/v3/texture/${cape.image_hash}/cape/users`
            );
            userCount = usersResponse.data.count;
          } catch (error) {
            console.error(
              `Error getting count for cape ${cape.image_hash}:`,
              error.message
            );
          }

          const formattedCape = {
            name: capeInfo ? capeInfo.name : "Unknown",
            hash: cape.image_hash,
          };

          // Add description if available in capeInfo
          if (capeInfo && capeInfo.description) {
            formattedCape.description = capeInfo.description;
          }

          // Add user count if available
          if (userCount !== null) {
            formattedCape.count = userCount;
          }

          // Add active field only if cape is active
          if (cape.active) {
            formattedCape.active = true;
          }

          return formattedCape;
        })
      );

      // Sort capes to show active ones first
      return formattedCapes.sort((a, b) => {
        if (a.active && !b.active) return -1;
        if (!a.active && b.active) return 1;
        return 0;
      });
    } catch (error) {
      // Check if it's an API response error
      if (error.response) {
        // If the API responds with "User not found"
        if (
          error.response.data &&
          error.response.data.error === "User not found"
        ) {
          throw new Error("User not found");
        }
      }

      // Log error for debugging
      console.error("Error retrieving player capes:", error.message);

      // Throw generic error for other issues
      throw new Error("Failed to retrieve capes information");
    }
  },

  /**
   * Get skins of a player by username or UUID
   */
  async getUserSkins(identifier) {
    try {
      // Query the Laby.net API to get profile data
      const response = await axios.get(
        `https://laby.net/api/v3/user/${identifier}/profile`
      );
      const profileData = response.data;

      // If player has no skins, return empty array
      const skins = profileData.textures.SKIN || [];
      if (skins.length === 0) {
        return [];
      }

      // Format skins with additional information
      const formattedSkins = await Promise.all(
        skins.map(async (skin) => {
          // Get user count for this skin
          let userCount = null;
          try {
            const usersResponse = await axios.get(
              `https://laby.net/api/v3/texture/${skin.image_hash}/skin/users`
            );
            userCount = usersResponse.data.count;
          } catch (error) {
            console.error(
              `Error getting count for skin ${skin.image_hash}:`,
              error.message
            );
          }

          // Get tags for this skin
          let skinTags = null;
          try {
            const tagsResponse = await axios.get(
              `https://laby.net/api/v3/texture/${skin.image_hash}/skin/tags`
            );

            // Sort tags by vote_score (most voted first)
            const sortedTags = tagsResponse.data.tags.sort(
              (a, b) => b.vote_score - a.vote_score
            );

            // Get top 3 tags
            const topTags = sortedTags.slice(0, 3);

            // Join tag names into a string
            skinTags = topTags.map((tag) => tag.tag).join(", ");
          } catch (error) {
            console.error(
              `Error getting tags for skin ${skin.image_hash}:`,
              error.message
            );
          }

          const formattedSkin = {
            hash: skin.image_hash,
          };

          // Add user count if available
          if (userCount !== null) {
            formattedSkin.count = userCount;
          }

          // Add tags if available
          if (skinTags) {
            formattedSkin.tags = skinTags;
          }

          // Add active field only if skin is active
          if (skin.active) {
            formattedSkin.active = true;
          }

          return formattedSkin;
        })
      );

      // Sort skins to show active ones first
      return formattedSkins.sort((a, b) => {
        if (a.active && !b.active) return -1;
        if (!a.active && b.active) return 1;
        return 0;
      });
    } catch (error) {
      // Check if it's an API response error
      if (error.response) {
        // If the API responds with "User not found"
        if (
          error.response.data &&
          error.response.data.error === "User not found"
        ) {
          throw new Error("User not found");
        }
      }

      // Log error for debugging
      console.error("Error retrieving player skins:", error.message);

      // Throw generic error for other issues
      throw new Error("Failed to retrieve skins information");
    }
  },

  /**
   * Format cape data according to our API standard
   */
  async formatCapes(capes = []) {
    try {
      // If no capes, return empty array
      if (!capes || capes.length === 0) return [];

      // Format all capes
      const formattedCapes = await Promise.all(
        capes.map(async (cape) => {
          // Get additional cape info from our database
          const capeInfo = await capesService.getCapeByHash(cape.image_hash);

          const formattedCape = {
            name: capeInfo ? capeInfo.name : "Unknown Cape",
            hash: cape.image_hash,
          };

          // Add description if available in capeInfo
          if (capeInfo && capeInfo.description) {
            formattedCape.description = capeInfo.description;
          }

          // Add active field only if cape is active
          if (cape.active) {
            formattedCape.active = true;
          }

          return formattedCape;
        })
      );

      // Sort capes to show active ones first
      return formattedCapes.sort((a, b) => {
        if (a.active && !b.active) return -1;
        if (!a.active && b.active) return 1;
        return 0;
      });
    } catch (error) {
      console.error("Error formatting capes:", error.message);
      return [];
    }
  },

  /**
   * Format skin data according to our API standard
   */
  async formatSkins(skins = []) {
    try {
      // If no skins, return empty array
      if (!skins || skins.length === 0) return [];

      // Format all skins without unnecessary fields
      const formattedSkins = skins.map((skin) => {
        const formattedSkin = {
          hash: skin.image_hash,
        };

        // Add active field only if skin is active
        if (skin.active) {
          formattedSkin.active = true;
        }

        return formattedSkin;
      });

      // Sort skins to show active ones first
      return formattedSkins.sort((a, b) => {
        if (a.active && !b.active) return -1;
        if (!a.active && b.active) return 1;
        return 0;
      });
    } catch (error) {
      console.error("Error formatting skins:", error.message);
      return [];
    }
  },
};

module.exports = profileService;
