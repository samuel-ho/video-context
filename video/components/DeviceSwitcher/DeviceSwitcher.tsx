// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import classNames from "classnames/bind";
import React, { useContext } from "react";
import Dropdown from "react-dropdown";

import ChimeSdkWrapper from "../../chime/ChimeSdkWrapper";
import getChimeContext from "../../context/getChimeContext";
import useDevices from "../../hooks/useDevices";
import DeviceType from "../../types/DeviceType";
import styles from "./DeviceSwitcher.css";

const cx = classNames.bind(styles);

export default function DeviceSwitcher() {
  const chime: ChimeSdkWrapper | null = useContext(getChimeContext());
  const deviceSwitcherState = useDevices();

  return (
    <div className={cx("deviceList")}>
      <Dropdown
        className={cx("dropdown")}
        controlClassName={cx("control")}
        placeholderClassName={cx("placeholder")}
        menuClassName={cx("menu")}
        arrowClassName={cx("arrow")}
        value={deviceSwitcherState.currentAudioInputDevice || undefined}
        options={deviceSwitcherState.audioInputDevices || ([] as DeviceType[])}
        disabled={
          !deviceSwitcherState.audioInputDevices ||
          !deviceSwitcherState.audioInputDevices.length
        }
        onChange={async (selectedDevice: DeviceType) => {
          await chime?.chooseAudioInputDevice(selectedDevice);
        }}
        placeholder={
          deviceSwitcherState.currentAudioInputDevice
            ? `No audio placeholder`
            : ""
        }
      />
      <Dropdown
        className={cx("dropdown")}
        controlClassName={cx("control")}
        placeholderClassName={cx("placeholder")}
        menuClassName={cx("menu")}
        arrowClassName={cx("arrow")}
        value={deviceSwitcherState.currentAudioOutputDevice || undefined}
        options={deviceSwitcherState.audioOutputDevices || ([] as DeviceType[])}
        disabled={
          !deviceSwitcherState.audioOutputDevices ||
          !deviceSwitcherState.audioOutputDevices.length
        }
        onChange={async (selectedDevice: DeviceType) => {
          await chime?.chooseAudioOutputDevice(selectedDevice);
        }}
        placeholder={
          deviceSwitcherState.currentAudioOutputDevice
            ? `No audio placeholder`
            : ""
        }
      />
      <Dropdown
        className={cx("dropdown")}
        controlClassName={cx("control")}
        placeholderClassName={cx("placeholder")}
        menuClassName={cx("menu")}
        arrowClassName={cx("arrow")}
        value={deviceSwitcherState.currentVideoInputDevice || undefined}
        options={deviceSwitcherState.videoInputDevices || ([] as DeviceType[])}
        disabled={
          !deviceSwitcherState.videoInputDevices ||
          !deviceSwitcherState.videoInputDevices.length
        }
        onChange={async (selectedDevice: DeviceType) => {
          await chime?.chooseVideoInputDevice(selectedDevice);
        }}
        placeholder={
          deviceSwitcherState.currentVideoInputDevice
            ? `No video input placeholder`
            : ""
        }
      />
    </div>
  );
}
