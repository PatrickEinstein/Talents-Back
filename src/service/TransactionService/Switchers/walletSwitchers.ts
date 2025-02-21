import { walletsAbstracts } from "../Abstracts/walletsAbstracts.js";
import { ChannelCode } from "../Data/Enums.js";
import { anotherSwitchService } from "../switchServices/anotherSwitchService.js";
import { ChamsSwitchService } from "../switchServices/chamsSwitchService.js";

export interface IWalletSwitcher {
  getWalletService: (channelCode: ChannelCode) => walletsAbstracts;
}


// ----- this class aggregates all the switch services
// --- it allows us to switch between different service providers incase one fails
// ---- this switching is made possible by the channel code passed in the body
// ---- the current service providers we have are chamsswitch  and another service provider i called 'anotherSwitchService'

export class walletSwitcher {
  constructor() {}

  getWalletService(channelCode: ChannelCode): walletsAbstracts {
    switch (channelCode) {
      case ChannelCode.ChamsSwitchService:
        return new ChamsSwitchService();
      case ChannelCode.anotherService:
        return new anotherSwitchService();
      default:
        throw new Error("Unsupported channel code");
    }
  }
}
