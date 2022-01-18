const schema = mongoose.Schema({
  guildID: String,
  ///user:String,
  prefix: { type: String, default: "Bo" },

  isPremium: {
    type: String,
    default: false
  },
  xp: {
    onoff: { type: String, default: "on" }
  },
  premium: {
    redeemedBy: {
      id: { type: String, default: null },
      tag: { type: String, default: null }
    },

    redeemedAt: { type: String, default: null },

    expiresAt: { type: String, default: null },

    plan: { type: String, default: null }
  },
  channels:{
    welcomech:{ type: String, default:null},
    xp:{type: String, default:null}
  },
  plugins: { type: Object, default: { // Plugins data
  welcome: {
			enabled: false, // Whether the welcome messages are enabled
			message: null, // The welcome message
		///	channel: null, // The channel to send the welcome messages
			withImage: null // Whether the welcome images are enabled
		},
		// Goodbye messages
		goodbye: {
			enabled: false, // Whether the goodbye messages are enabled
			message: null, // The goodbye message
		///	channel: null, // The channel to send the goodbye messages
			withImage: null // Whether the goodbye images are enabled
    }}},
  
  
  whitelist: { type: Array, default: [] },
 
});
module.exports = mongoose.model("Guild", schema);
