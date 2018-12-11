import BridgeService from '@/bridgeService';

export default function(to, bridge) {
  bridge.send(to.params['0']);
}
