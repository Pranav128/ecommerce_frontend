"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.LeaderElectionService = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _broadcastChannel = require("broadcast-channel");
var _features = require("../features");
/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */

class LeaderElectionService {
  constructor(options = {}) {
    (0, _defineProperty2.default)(this, "started", false);
    this.options = options;
    this.onLeaderDuplicate = this.onLeaderDuplicate.bind(this);
    this.onLeader = this.onLeader.bind(this);
  }
  onLeaderDuplicate() {}
  async onLeader() {
    await this.options.onLeader?.();
  }
  isLeader() {
    return !!this.elector?.isLeader;
  }
  hasLeader() {
    return !!this.elector?.hasLeader;
  }
  async start() {
    if (this.canStart()) {
      const {
        electionChannelName
      } = this.options;
      this.channel = new _broadcastChannel.BroadcastChannel(electionChannelName);
      this.elector = (0, _broadcastChannel.createLeaderElection)(this.channel);
      this.elector.onduplicate = this.onLeaderDuplicate;
      this.elector.awaitLeadership().then(this.onLeader);
      this.started = true;
    }
  }
  async stop() {
    if (this.started) {
      if (this.elector) {
        await this.elector.die();
        this.elector = undefined;
      }
      if (this.channel) {
        // Workaround to fix error `Failed to execute 'postMessage' on 'BroadcastChannel': Channel is closed`
        this.channel.postInternal = () => Promise.resolve();
        await this.channel.close();
        this.channel = undefined;
      }
      this.started = false;
    }
  }
  requiresLeadership() {
    return false;
  }
  isStarted() {
    return this.started;
  }
  canStart() {
    return (0, _features.isBrowser)() && !this.started;
  }
}
exports.LeaderElectionService = LeaderElectionService;
//# sourceMappingURL=LeaderElectionService.js.map