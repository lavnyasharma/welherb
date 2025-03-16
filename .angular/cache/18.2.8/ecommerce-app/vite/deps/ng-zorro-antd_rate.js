import {
  NzToolTipModule,
  NzTooltipDirective
} from "./chunk-MTKIE4KU.js";
import "./chunk-SLHARQNK.js";
import {
  LEFT_ARROW,
  NzDestroyService,
  RIGHT_ARROW
} from "./chunk-46TIT4PO.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-3KONI2QG.js";
import "./chunk-Y5OPQVSO.js";
import {
  Directionality
} from "./chunk-RRD7VGP5.js";
import "./chunk-JQ5OKNC4.js";
import {
  NzConfigService,
  WithConfig,
  fromEventOutsideAngular
} from "./chunk-T75CJG3I.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-FS453U5G.js";
import "./chunk-CXBJZMFE.js";
import "./chunk-D2M4V2QW.js";
import "./chunk-I5T3YL4O.js";
import "./chunk-DBFSOOFY.js";
import {
  NgTemplateOutlet
} from "./chunk-7BWEPHN5.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation$1,
  booleanAttribute,
  forwardRef,
  numberAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-JNL4SJHY.js";
import {
  __esDecorate,
  __runInitializers,
  takeUntil
} from "./chunk-6QNTARNC.js";
import "./chunk-WDMUDEB6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-rate.mjs
var _c0 = ["nz-rate-item", ""];
var _c1 = (a0) => ({
  $implicit: a0
});
function NzRateItemComponent_ng_template_1_Template(rf, ctx) {
}
function NzRateItemComponent_ng_template_3_Template(rf, ctx) {
}
function NzRateItemComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-icon", 4);
  }
}
var _c2 = ["ulElement"];
function NzRateComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 3)(1, "div", 4);
    ɵɵlistener("itemHover", function NzRateComponent_For_3_Template_div_itemHover_1_listener($event) {
      const $index_r3 = ɵɵrestoreView(_r2).$index;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onItemHover($index_r3, $event));
    })("itemClick", function NzRateComponent_For_3_Template_div_itemClick_1_listener($event) {
      const $index_r3 = ɵɵrestoreView(_r2).$index;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3.onItemClick($index_r3, $event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const $index_r3 = ctx.$index;
    const ctx_r3 = ɵɵnextContext();
    ɵɵclassMap(ctx_r3.starStyleArray[$index_r3] || "");
    ɵɵproperty("nzTooltipTitle", ctx_r3.nzTooltips[$index_r3]);
    ɵɵadvance();
    ɵɵproperty("allowHalf", ctx_r3.nzAllowHalf)("character", ctx_r3.nzCharacter)("index", $index_r3);
  }
}
var NzRateItemComponent = class _NzRateItemComponent {
  constructor() {
    this.index = 0;
    this.allowHalf = false;
    this.itemHover = new EventEmitter();
    this.itemClick = new EventEmitter();
  }
  hoverRate(isHalf) {
    this.itemHover.next(isHalf && this.allowHalf);
  }
  clickRate(isHalf) {
    this.itemClick.next(isHalf && this.allowHalf);
  }
  static {
    this.ɵfac = function NzRateItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzRateItemComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NzRateItemComponent,
      selectors: [["", "nz-rate-item", ""]],
      inputs: {
        character: "character",
        index: "index",
        allowHalf: [2, "allowHalf", "allowHalf", booleanAttribute]
      },
      outputs: {
        itemHover: "itemHover",
        itemClick: "itemClick"
      },
      exportAs: ["nzRateItem"],
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      attrs: _c0,
      decls: 6,
      vars: 8,
      consts: [["defaultCharacter", ""], [1, "ant-rate-star-second", 3, "mouseover", "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-rate-star-first", 3, "mouseover", "click"], ["nzType", "star", "nzTheme", "fill"]],
      template: function NzRateItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵelementStart(0, "div", 1);
          ɵɵlistener("mouseover", function NzRateItemComponent_Template_div_mouseover_0_listener($event) {
            ɵɵrestoreView(_r1);
            ctx.hoverRate(false);
            return ɵɵresetView($event.stopPropagation());
          })("click", function NzRateItemComponent_Template_div_click_0_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.clickRate(false));
          });
          ɵɵtemplate(1, NzRateItemComponent_ng_template_1_Template, 0, 0, "ng-template", 2);
          ɵɵelementEnd();
          ɵɵelementStart(2, "div", 3);
          ɵɵlistener("mouseover", function NzRateItemComponent_Template_div_mouseover_2_listener($event) {
            ɵɵrestoreView(_r1);
            ctx.hoverRate(true);
            return ɵɵresetView($event.stopPropagation());
          })("click", function NzRateItemComponent_Template_div_click_2_listener() {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.clickRate(true));
          });
          ɵɵtemplate(3, NzRateItemComponent_ng_template_3_Template, 0, 0, "ng-template", 2);
          ɵɵelementEnd();
          ɵɵtemplate(4, NzRateItemComponent_ng_template_4_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
          const defaultCharacter_r2 = ɵɵreference(5);
          ɵɵadvance();
          ɵɵproperty("ngTemplateOutlet", ctx.character || defaultCharacter_r2)("ngTemplateOutletContext", ɵɵpureFunction1(4, _c1, ctx.index));
          ɵɵadvance(2);
          ɵɵproperty("ngTemplateOutlet", ctx.character || defaultCharacter_r2)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c1, ctx.index));
        }
      },
      dependencies: [NgTemplateOutlet, NzIconModule, NzIconDirective],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRateItemComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      selector: "[nz-rate-item]",
      exportAs: "nzRateItem",
      template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <nz-icon nzType="star" nzTheme="fill" />
    </ng-template>
  `,
      imports: [NgTemplateOutlet, NzIconModule]
    }]
  }], null, {
    character: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    allowHalf: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    itemHover: [{
      type: Output
    }],
    itemClick: [{
      type: Output
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "rate";
var NzRateComponent = (() => {
  let _nzAllowClear_decorators;
  let _nzAllowClear_initializers = [];
  let _nzAllowClear_extraInitializers = [];
  let _nzAllowHalf_decorators;
  let _nzAllowHalf_initializers = [];
  let _nzAllowHalf_extraInitializers = [];
  return class NzRateComponent2 {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _nzAllowClear_decorators = [WithConfig()];
      _nzAllowHalf_decorators = [WithConfig()];
      __esDecorate(null, null, _nzAllowClear_decorators, {
        kind: "field",
        name: "nzAllowClear",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzAllowClear" in obj,
          get: (obj) => obj.nzAllowClear,
          set: (obj, value) => {
            obj.nzAllowClear = value;
          }
        },
        metadata: _metadata
      }, _nzAllowClear_initializers, _nzAllowClear_extraInitializers);
      __esDecorate(null, null, _nzAllowHalf_decorators, {
        kind: "field",
        name: "nzAllowHalf",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzAllowHalf" in obj,
          get: (obj) => obj.nzAllowHalf,
          set: (obj, value) => {
            obj.nzAllowHalf = value;
          }
        },
        metadata: _metadata
      }, _nzAllowHalf_initializers, _nzAllowHalf_extraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata
      });
    }
    get nzValue() {
      return this._value;
    }
    set nzValue(input) {
      if (this._value === input) {
        return;
      }
      this._value = input;
      this.hasHalf = !Number.isInteger(input) && this.nzAllowHalf;
      this.hoverValue = Math.ceil(input);
    }
    constructor(nzConfigService, ngZone, renderer, cdr, directionality, destroy$) {
      this.nzConfigService = nzConfigService;
      this.ngZone = ngZone;
      this.renderer = renderer;
      this.cdr = cdr;
      this.directionality = directionality;
      this.destroy$ = destroy$;
      this._nzModuleName = NZ_CONFIG_MODULE_NAME;
      this.nzAllowClear = __runInitializers(this, _nzAllowClear_initializers, true);
      this.nzAllowHalf = (__runInitializers(this, _nzAllowClear_extraInitializers), __runInitializers(this, _nzAllowHalf_initializers, false));
      this.nzDisabled = (__runInitializers(this, _nzAllowHalf_extraInitializers), false);
      this.nzAutoFocus = false;
      this.nzCount = 5;
      this.nzTooltips = [];
      this.nzOnBlur = new EventEmitter();
      this.nzOnFocus = new EventEmitter();
      this.nzOnHoverChange = new EventEmitter();
      this.nzOnKeyDown = new EventEmitter();
      this.classMap = {};
      this.starArray = [];
      this.starStyleArray = [];
      this.dir = "ltr";
      this.hasHalf = false;
      this.hoverValue = 0;
      this.isFocused = false;
      this._value = 0;
      this.isNzDisableFirstChange = true;
      this.onChange = () => null;
      this.onTouched = () => null;
    }
    ngOnChanges(changes) {
      const {
        nzAutoFocus,
        nzCount,
        nzValue
      } = changes;
      if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
        const el = this.ulElement.nativeElement;
        if (this.nzAutoFocus && !this.nzDisabled) {
          this.renderer.setAttribute(el, "autofocus", "autofocus");
        } else {
          this.renderer.removeAttribute(el, "autofocus");
        }
      }
      if (nzCount) {
        this.updateStarArray();
      }
      if (nzValue) {
        this.updateStarStyle();
      }
    }
    ngOnInit() {
      this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME).pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
      this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
      fromEventOutsideAngular(this.ulElement.nativeElement, "focus").pipe(takeUntil(this.destroy$)).subscribe((event) => {
        this.isFocused = true;
        if (this.nzOnFocus.observers.length) {
          this.ngZone.run(() => this.nzOnFocus.emit(event));
        }
      });
      fromEventOutsideAngular(this.ulElement.nativeElement, "blur").pipe(takeUntil(this.destroy$)).subscribe((event) => {
        this.isFocused = false;
        if (this.nzOnBlur.observers.length) {
          this.ngZone.run(() => this.nzOnBlur.emit(event));
        }
      });
    }
    onItemClick(index, isHalf) {
      if (this.nzDisabled) {
        return;
      }
      this.hoverValue = index + 1;
      const actualValue = isHalf ? index + 0.5 : index + 1;
      if (this.nzValue === actualValue) {
        if (this.nzAllowClear) {
          this.nzValue = 0;
          this.onChange(this.nzValue);
        }
      } else {
        this.nzValue = actualValue;
        this.onChange(this.nzValue);
      }
      this.updateStarStyle();
    }
    onItemHover(index, isHalf) {
      if (this.nzDisabled) {
        return;
      }
      if (this.hoverValue !== index + 1 || isHalf !== this.hasHalf) {
        this.hoverValue = index + 1;
        this.hasHalf = isHalf;
        this.updateStarStyle();
      }
      this.nzOnHoverChange.emit(this.hoverValue);
    }
    onRateLeave() {
      this.hasHalf = !Number.isInteger(this.nzValue);
      this.hoverValue = Math.ceil(this.nzValue);
      this.nzOnHoverChange.emit(this.hoverValue);
      this.updateStarStyle();
    }
    focus() {
      this.ulElement.nativeElement.focus();
    }
    blur() {
      this.ulElement.nativeElement.blur();
    }
    onKeyDown(e) {
      const oldVal = this.nzValue;
      if (e.keyCode === RIGHT_ARROW && this.nzValue < this.nzCount) {
        this.nzValue += this.nzAllowHalf ? 0.5 : 1;
      } else if (e.keyCode === LEFT_ARROW && this.nzValue > 0) {
        this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
      }
      if (oldVal !== this.nzValue) {
        this.onChange(this.nzValue);
        this.nzOnKeyDown.emit(e);
        this.updateStarStyle();
        this.cdr.markForCheck();
      }
    }
    updateStarArray() {
      this.starArray = Array(this.nzCount).fill(0).map((_, i) => i);
      this.updateStarStyle();
    }
    updateStarStyle() {
      this.starStyleArray = this.starArray.map((i) => {
        const prefix = "ant-rate-star";
        const value = i + 1;
        return {
          [`${prefix}-full`]: value < this.hoverValue || !this.hasHalf && value === this.hoverValue,
          [`${prefix}-half`]: this.hasHalf && value === this.hoverValue,
          [`${prefix}-active`]: this.hasHalf && value === this.hoverValue,
          [`${prefix}-zero`]: value > this.hoverValue,
          [`${prefix}-focused`]: this.hasHalf && value === this.hoverValue && this.isFocused
        };
      });
    }
    writeValue(value) {
      this.nzValue = value || 0;
      this.updateStarArray();
      this.cdr.markForCheck();
    }
    setDisabledState(isDisabled) {
      this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
      this.isNzDisableFirstChange = false;
      this.cdr.markForCheck();
    }
    registerOnChange(fn) {
      this.onChange = fn;
    }
    registerOnTouched(fn) {
      this.onTouched = fn;
    }
    static {
      this.ɵfac = function NzRateComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || NzRateComponent2)(ɵɵdirectiveInject(NzConfigService), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(NzDestroyService));
      };
    }
    static {
      this.ɵcmp = ɵɵdefineComponent({
        type: NzRateComponent2,
        selectors: [["nz-rate"]],
        viewQuery: function NzRateComponent_Query(rf, ctx) {
          if (rf & 1) {
            ɵɵviewQuery(_c2, 7);
          }
          if (rf & 2) {
            let _t;
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.ulElement = _t.first);
          }
        },
        inputs: {
          nzAllowClear: [2, "nzAllowClear", "nzAllowClear", booleanAttribute],
          nzAllowHalf: [2, "nzAllowHalf", "nzAllowHalf", booleanAttribute],
          nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
          nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
          nzCharacter: "nzCharacter",
          nzCount: [2, "nzCount", "nzCount", numberAttribute],
          nzTooltips: "nzTooltips"
        },
        outputs: {
          nzOnBlur: "nzOnBlur",
          nzOnFocus: "nzOnFocus",
          nzOnHoverChange: "nzOnHoverChange",
          nzOnKeyDown: "nzOnKeyDown"
        },
        exportAs: ["nzRate"],
        standalone: true,
        features: [ɵɵProvidersFeature([NzDestroyService, {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => NzRateComponent2),
          multi: true
        }]), ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
        decls: 4,
        vars: 7,
        consts: [["ulElement", ""], [1, "ant-rate", 3, "keydown", "mouseleave", "tabindex"], ["nz-tooltip", "", 1, "ant-rate-star", 3, "class", "nzTooltipTitle"], ["nz-tooltip", "", 1, "ant-rate-star", 3, "nzTooltipTitle"], ["nz-rate-item", "", 3, "itemHover", "itemClick", "allowHalf", "character", "index"]],
        template: function NzRateComponent_Template(rf, ctx) {
          if (rf & 1) {
            const _r1 = ɵɵgetCurrentView();
            ɵɵelementStart(0, "ul", 1, 0);
            ɵɵlistener("keydown", function NzRateComponent_Template_ul_keydown_0_listener($event) {
              ɵɵrestoreView(_r1);
              ctx.onKeyDown($event);
              return ɵɵresetView($event.preventDefault());
            })("mouseleave", function NzRateComponent_Template_ul_mouseleave_0_listener($event) {
              ɵɵrestoreView(_r1);
              ctx.onRateLeave();
              return ɵɵresetView($event.stopPropagation());
            });
            ɵɵrepeaterCreate(2, NzRateComponent_For_3_Template, 2, 6, "li", 2, ɵɵrepeaterTrackByIdentity);
            ɵɵelementEnd();
          }
          if (rf & 2) {
            ɵɵclassMap(ctx.classMap);
            ɵɵclassProp("ant-rate-disabled", ctx.nzDisabled)("ant-rate-rtl", ctx.dir === "rtl");
            ɵɵproperty("tabindex", ctx.nzDisabled ? -1 : 1);
            ɵɵadvance(2);
            ɵɵrepeater(ctx.starArray);
          }
        },
        dependencies: [NzToolTipModule, NzTooltipDirective, NzRateItemComponent],
        encapsulation: 2,
        changeDetection: 0
      });
    }
  };
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRateComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      selector: "nz-rate",
      exportAs: "nzRate",
      preserveWhitespaces: false,
      template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [class.ant-rate-rtl]="dir === 'rtl'"
      [class]="classMap"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="nzDisabled ? -1 : 1"
    >
      @for (star of starArray; track star) {
        <li
          class="ant-rate-star"
          [class]="starStyleArray[$index] || ''"
          nz-tooltip
          [nzTooltipTitle]="nzTooltips[$index]"
        >
          <div
            nz-rate-item
            [allowHalf]="nzAllowHalf"
            [character]="nzCharacter"
            [index]="$index"
            (itemHover)="onItemHover($index, $event)"
            (itemClick)="onItemClick($index, $event)"
          ></div>
        </li>
      }
    </ul>
  `,
      providers: [NzDestroyService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzRateComponent),
        multi: true
      }],
      imports: [NzToolTipModule, NzRateItemComponent, NzToolTipModule]
    }]
  }], () => [{
    type: NzConfigService
  }, {
    type: NgZone
  }, {
    type: Renderer2
  }, {
    type: ChangeDetectorRef
  }, {
    type: Directionality
  }, {
    type: NzDestroyService
  }], {
    ulElement: [{
      type: ViewChild,
      args: ["ulElement", {
        static: true
      }]
    }],
    nzAllowClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAllowHalf: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCharacter: [{
      type: Input
    }],
    nzCount: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzTooltips: [{
      type: Input
    }],
    nzOnBlur: [{
      type: Output
    }],
    nzOnFocus: [{
      type: Output
    }],
    nzOnHoverChange: [{
      type: Output
    }],
    nzOnKeyDown: [{
      type: Output
    }]
  });
})();
var NzRateModule = class _NzRateModule {
  static {
    this.ɵfac = function NzRateModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzRateModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NzRateModule,
      imports: [NzRateComponent, NzRateItemComponent],
      exports: [NzRateComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [NzRateComponent, NzRateItemComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRateModule, [{
    type: NgModule,
    args: [{
      imports: [NzRateComponent, NzRateItemComponent],
      exports: [NzRateComponent]
    }]
  }], null, null);
})();
export {
  NzRateComponent,
  NzRateItemComponent,
  NzRateModule
};
//# sourceMappingURL=ng-zorro-antd_rate.js.map
