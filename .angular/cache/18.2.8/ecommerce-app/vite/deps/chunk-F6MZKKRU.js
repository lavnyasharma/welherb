import {
  NzIconDirective,
  NzIconModule
} from "./chunk-LZNZKCBH.js";
import {
  Directionality
} from "./chunk-RRD7VGP5.js";
import {
  NzStringTemplateOutletDirective
} from "./chunk-JQ5OKNC4.js";
import {
  NzConfigService,
  WithConfig
} from "./chunk-O6VXPZQH.js";
import {
  NgTemplateOutlet
} from "./chunk-7BWEPHN5.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  RuntimeError,
  TemplateRef,
  ViewEncapsulation$1,
  afterNextRender,
  assertInInjectionContext,
  assertNotInReactiveContext,
  booleanAttribute,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-JNL4SJHY.js";
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  __esDecorate,
  __runInitializers,
  takeUntil
} from "./chunk-6QNTARNC.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-form.mjs
function NzFormItemFeedbackIconComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-icon", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("nzType", ctx_r0.iconType);
  }
}
var NzFormStatusService = class _NzFormStatusService {
  constructor() {
    this.formStatusChanges = new ReplaySubject(1);
  }
  static {
    this.ɵfac = function NzFormStatusService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzFormStatusService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NzFormStatusService,
      factory: _NzFormStatusService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormStatusService, [{
    type: Injectable
  }], null, null);
})();
var NzFormNoStatusService = class _NzFormNoStatusService {
  constructor() {
    this.noFormStatus = new BehaviorSubject(false);
  }
  static {
    this.ɵfac = function NzFormNoStatusService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzFormNoStatusService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NzFormNoStatusService,
      factory: _NzFormNoStatusService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormNoStatusService, [{
    type: Injectable
  }], null, null);
})();
var iconTypeMap = {
  error: "close-circle-fill",
  validating: "loading",
  success: "check-circle-fill",
  warning: "exclamation-circle-fill"
};
var NzFormItemFeedbackIconComponent = class _NzFormItemFeedbackIconComponent {
  constructor(cdr) {
    this.cdr = cdr;
    this.status = "";
    this.iconType = null;
  }
  ngOnChanges(_changes) {
    this.updateIcon();
  }
  updateIcon() {
    this.iconType = this.status ? iconTypeMap[this.status] : null;
    this.cdr.markForCheck();
  }
  static {
    this.ɵfac = function NzFormItemFeedbackIconComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzFormItemFeedbackIconComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NzFormItemFeedbackIconComponent,
      selectors: [["nz-form-item-feedback-icon"]],
      hostAttrs: [1, "ant-form-item-feedback-icon"],
      hostVars: 8,
      hostBindings: function NzFormItemFeedbackIconComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("ant-form-item-feedback-icon-error", ctx.status === "error")("ant-form-item-feedback-icon-warning", ctx.status === "warning")("ant-form-item-feedback-icon-success", ctx.status === "success")("ant-form-item-feedback-icon-validating", ctx.status === "validating");
        }
      },
      inputs: {
        status: "status"
      },
      exportAs: ["nzFormFeedbackIcon"],
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 1,
      vars: 1,
      consts: [[3, "nzType"]],
      template: function NzFormItemFeedbackIconComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, NzFormItemFeedbackIconComponent_Conditional_0_Template, 1, 1, "nz-icon", 0);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.iconType ? 0 : -1);
        }
      },
      dependencies: [NzIconModule, NzIconDirective],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormItemFeedbackIconComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-item-feedback-icon",
      exportAs: "nzFormFeedbackIcon",
      imports: [NzIconModule],
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (iconType) {
      <nz-icon [nzType]="iconType" />
    }
  `,
      host: {
        class: "ant-form-item-feedback-icon",
        "[class.ant-form-item-feedback-icon-error]": 'status==="error"',
        "[class.ant-form-item-feedback-icon-warning]": 'status==="warning"',
        "[class.ant-form-item-feedback-icon-success]": 'status==="success"',
        "[class.ant-form-item-feedback-icon-validating]": 'status==="validating"'
      }
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    status: [{
      type: Input
    }]
  });
})();
var NzFormPatchModule = class _NzFormPatchModule {
  static {
    this.ɵfac = function NzFormPatchModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzFormPatchModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NzFormPatchModule,
      imports: [NzFormItemFeedbackIconComponent],
      exports: [NzFormItemFeedbackIconComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [NzFormItemFeedbackIconComponent]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormPatchModule, [{
    type: NgModule,
    args: [{
      imports: [NzFormItemFeedbackIconComponent],
      exports: [NzFormItemFeedbackIconComponent]
    }]
  }], null, null);
})();

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function toSignal(source, options) {
  ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  requiresCleanup && !options?.injector && assertInInjectionContext(toSignal);
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, {
      equal
    });
  } else {
    state = signal({
      kind: 1,
      value: options?.initialValue
    }, {
      equal
    });
  }
  const sub = source.subscribe({
    next: (value) => state.set({
      kind: 1,
      value
    }),
    error: (error) => {
      if (options?.rejectErrors) {
        throw error;
      }
      state.set({
        kind: 2,
        error
      });
    }
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, {
    equal: options?.equal
  });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-space.mjs
var _c0 = ["*"];
var _c1 = (a0) => ({
  $implicit: a0
});
function NzSpaceComponent_For_2_Conditional_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵtextInterpolate(ctx_r0.nzSplit);
  }
}
function NzSpaceComponent_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵtemplate(1, NzSpaceComponent_For_2_Conditional_2_ng_template_1_Template, 1, 1, "ng-template", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const ɵ$index_2_r3 = ctx_r1.$index;
    const ɵ$count_2_r4 = ctx_r1.$count;
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleProp("margin-bottom", ctx_r0.nzDirection === "vertical" ? ɵ$index_2_r3 === ɵ$count_2_r4 - 1 ? null : ctx_r0.spaceSize : null, "px")("margin-right", ctx_r0.nzDirection === "horizontal" ? ɵ$index_2_r3 === ɵ$count_2_r4 - 1 ? null : ctx_r0.spaceSize : null, "px");
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.nzSplit)("nzStringTemplateOutletContext", ɵɵpureFunction1(6, _c1, ɵ$index_2_r3));
  }
}
function NzSpaceComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 0);
    ɵɵelementContainer(1, 1);
    ɵɵelementEnd();
    ɵɵtemplate(2, NzSpaceComponent_For_2_Conditional_2_Template, 2, 8, "span", 2);
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ɵ$index_2_r3 = ctx.$index;
    const ɵ$count_2_r4 = ctx.$count;
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleProp("margin-bottom", ctx_r0.nzDirection === "vertical" ? ɵ$index_2_r3 === ɵ$count_2_r4 - 1 ? null : ctx_r0.spaceSize : null, "px")("margin-right", ctx_r0.nzDirection === "horizontal" ? ɵ$index_2_r3 === ɵ$count_2_r4 - 1 ? null : ctx_r0.spaceSize : null, "px");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", item_r5);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzSplit && !(ɵ$index_2_r3 === ɵ$count_2_r4 - 1) ? 2 : -1);
  }
}
var NZ_SPACE_COMPACT_SIZE = new InjectionToken("NZ_SPACE_COMPACT_SIZE");
var NZ_SPACE_COMPACT_ITEMS = new InjectionToken("NZ_SPACE_COMPACT_ITEMS");
var NZ_SPACE_COMPACT_ITEM_TYPE = new InjectionToken("NZ_SPACE_COMPACT_ITEM_TYPE");
var NzSpaceCompactComponent = class _NzSpaceCompactComponent {
  constructor() {
    this.nzBlock = input(false, {
      transform: booleanAttribute
    });
    this.nzDirection = input("horizontal");
    this.nzSize = input("default");
    this.elementRef = inject(ElementRef);
  }
  static {
    this.ɵfac = function NzSpaceCompactComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzSpaceCompactComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NzSpaceCompactComponent,
      selectors: [["nz-space-compact"]],
      hostAttrs: [1, "ant-space-compact"],
      hostVars: 4,
      hostBindings: function NzSpaceCompactComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("ant-space-compact-block", ctx.nzBlock())("ant-space-compact-vertical", ctx.nzDirection() === "vertical");
        }
      },
      inputs: {
        nzBlock: [1, "nzBlock"],
        nzDirection: [1, "nzDirection"],
        nzSize: [1, "nzSize"]
      },
      exportAs: ["nzSpaceCompact"],
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: NZ_SPACE_COMPACT_SIZE,
        useFactory: () => inject(_NzSpaceCompactComponent).nzSize
      }, {
        provide: NZ_SPACE_COMPACT_ITEMS,
        useFactory: () => signal([])
      }]), ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function NzSpaceCompactComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpaceCompactComponent, [{
    type: Component,
    args: [{
      selector: "nz-space-compact",
      exportAs: "nzSpaceCompact",
      template: `<ng-content></ng-content>`,
      host: {
        class: "ant-space-compact",
        "[class.ant-space-compact-block]": `nzBlock()`,
        "[class.ant-space-compact-vertical]": `nzDirection() === 'vertical'`
      },
      providers: [{
        provide: NZ_SPACE_COMPACT_SIZE,
        useFactory: () => inject(NzSpaceCompactComponent).nzSize
      }, {
        provide: NZ_SPACE_COMPACT_ITEMS,
        useFactory: () => signal([])
      }],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var NzSpaceCompactItemDirective = class _NzSpaceCompactItemDirective {
  get parentElement() {
    return this.elementRef.nativeElement?.parentElement;
  }
  constructor() {
    this.spaceCompactCmp = inject(NzSpaceCompactComponent, {
      host: true,
      optional: true
    });
    this.items = inject(NZ_SPACE_COMPACT_ITEMS, {
      host: true,
      optional: true
    });
    this.type = inject(NZ_SPACE_COMPACT_ITEM_TYPE);
    this.elementRef = inject(ElementRef);
    this.directionality = inject(Directionality);
    this.dir = toSignal(this.directionality.change, {
      initialValue: this.directionality.value
    });
    this.class = computed(() => {
      if (!this.spaceCompactCmp || !this.items) return null;
      if (this.parentElement !== this.spaceCompactCmp.elementRef.nativeElement) return null;
      const items = this.items();
      const direction = this.spaceCompactCmp.nzDirection();
      const classes = [compactItemClassOf(this.type, direction, this.dir() === "rtl")];
      const index = items.indexOf(this);
      const firstIndex = items.findIndex((element) => element);
      if (index === firstIndex) {
        classes.push(compactFirstItemClassOf(this.type, direction));
      } else if (index === items.length - 1) {
        classes.push(compactLastItemClassOf(this.type, direction));
      }
      return classes;
    });
    if (!this.spaceCompactCmp || !this.items) return;
    afterNextRender(() => {
      if (this.parentElement === this.spaceCompactCmp.elementRef.nativeElement) {
        const index = Array.from(this.parentElement.children).indexOf(this.elementRef.nativeElement);
        this.items.update((value) => {
          const newValue = value.slice();
          newValue.splice(index, 0, this);
          return newValue;
        });
      }
    });
  }
  ngOnDestroy() {
    this.items?.update((value) => value.filter((o) => o !== this));
  }
  static {
    this.ɵfac = function NzSpaceCompactItemDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzSpaceCompactItemDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NzSpaceCompactItemDirective,
      hostVars: 2,
      hostBindings: function NzSpaceCompactItemDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassMap(ctx.class());
        }
      },
      exportAs: ["nzSpaceCompactItem"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpaceCompactItemDirective, [{
    type: Directive,
    args: [{
      exportAs: "nzSpaceCompactItem",
      host: {
        "[class]": "class()"
      }
    }]
  }], () => [], null);
})();
function generateCompactClass(type, direction, position) {
  const directionPrefix = direction === "vertical" ? "vertical-" : "";
  return `ant-${type}-compact-${directionPrefix}${position}`;
}
function compactItemClassOf(type, direction, rtl) {
  const rtlSuffix = rtl ? "-rtl" : "";
  return `${generateCompactClass(type, direction, "item")}${rtlSuffix}`;
}
function compactFirstItemClassOf(type, direction) {
  return generateCompactClass(type, direction, "first-item");
}
function compactLastItemClassOf(type, direction) {
  return generateCompactClass(type, direction, "last-item");
}
var NzSpaceItemDirective = class _NzSpaceItemDirective {
  static {
    this.ɵfac = function NzSpaceItemDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzSpaceItemDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NzSpaceItemDirective,
      selectors: [["", "nzSpaceItem", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpaceItemDirective, [{
    type: Directive,
    args: [{
      selector: "[nzSpaceItem]"
    }]
  }], null, null);
})();
var NZ_CONFIG_MODULE_NAME = "space";
var SPACE_SIZE = {
  small: 8,
  middle: 16,
  large: 24
};
var NzSpaceComponent = (() => {
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  return class NzSpaceComponent2 {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _nzSize_decorators = [WithConfig()];
      __esDecorate(null, null, _nzSize_decorators, {
        kind: "field",
        name: "nzSize",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzSize" in obj,
          get: (obj) => obj.nzSize,
          set: (obj, value) => {
            obj.nzSize = value;
          }
        },
        metadata: _metadata
      }, _nzSize_initializers, _nzSize_extraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata
      });
    }
    constructor(nzConfigService, cdr) {
      this.nzConfigService = nzConfigService;
      this.cdr = cdr;
      this._nzModuleName = NZ_CONFIG_MODULE_NAME;
      this.nzDirection = "horizontal";
      this.nzSplit = null;
      this.nzWrap = false;
      this.nzSize = __runInitializers(this, _nzSize_initializers, "small");
      this.items = __runInitializers(this, _nzSize_extraInitializers);
      this.spaceSize = SPACE_SIZE.small;
      this.destroy$ = new Subject();
    }
    updateSpaceItems() {
      const numberSize = typeof this.nzSize === "string" ? SPACE_SIZE[this.nzSize] : this.nzSize;
      this.spaceSize = numberSize / (this.nzSplit ? 2 : 1);
      this.cdr.markForCheck();
    }
    ngOnChanges() {
      this.updateSpaceItems();
      this.mergedAlign = this.nzAlign === void 0 && this.nzDirection === "horizontal" ? "center" : this.nzAlign;
    }
    ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
    ngAfterContentInit() {
      this.updateSpaceItems();
      this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.cdr.markForCheck();
      });
    }
    static {
      this.ɵfac = function NzSpaceComponent_Factory(__ngFactoryType__) {
        return new (__ngFactoryType__ || NzSpaceComponent2)(ɵɵdirectiveInject(NzConfigService), ɵɵdirectiveInject(ChangeDetectorRef));
      };
    }
    static {
      this.ɵcmp = ɵɵdefineComponent({
        type: NzSpaceComponent2,
        selectors: [["nz-space"], ["", "nz-space", ""]],
        contentQueries: function NzSpaceComponent_ContentQueries(rf, ctx, dirIndex) {
          if (rf & 1) {
            ɵɵcontentQuery(dirIndex, NzSpaceItemDirective, 4, TemplateRef);
          }
          if (rf & 2) {
            let _t;
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.items = _t);
          }
        },
        hostAttrs: [1, "ant-space"],
        hostVars: 14,
        hostBindings: function NzSpaceComponent_HostBindings(rf, ctx) {
          if (rf & 2) {
            ɵɵstyleProp("flex-wrap", ctx.nzWrap ? "wrap" : null);
            ɵɵclassProp("ant-space-horizontal", ctx.nzDirection === "horizontal")("ant-space-vertical", ctx.nzDirection === "vertical")("ant-space-align-start", ctx.mergedAlign === "start")("ant-space-align-end", ctx.mergedAlign === "end")("ant-space-align-center", ctx.mergedAlign === "center")("ant-space-align-baseline", ctx.mergedAlign === "baseline");
          }
        },
        inputs: {
          nzDirection: "nzDirection",
          nzAlign: "nzAlign",
          nzSplit: "nzSplit",
          nzWrap: [2, "nzWrap", "nzWrap", booleanAttribute],
          nzSize: "nzSize"
        },
        exportAs: ["nzSpace"],
        standalone: true,
        features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
        ngContentSelectors: _c0,
        decls: 3,
        vars: 0,
        consts: [[1, "ant-space-item"], [3, "ngTemplateOutlet"], [1, "ant-space-split", 3, "margin-bottom", "margin-right"], [1, "ant-space-split"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
        template: function NzSpaceComponent_Template(rf, ctx) {
          if (rf & 1) {
            ɵɵprojectionDef();
            ɵɵprojection(0);
            ɵɵrepeaterCreate(1, NzSpaceComponent_For_2_Template, 3, 6, null, null, ɵɵrepeaterTrackByIdentity);
          }
          if (rf & 2) {
            ɵɵadvance();
            ɵɵrepeater(ctx.items);
          }
        },
        dependencies: [NgTemplateOutlet, NzStringTemplateOutletDirective],
        encapsulation: 2,
        changeDetection: 0
      });
    }
  };
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpaceComponent, [{
    type: Component,
    args: [{
      selector: "nz-space, [nz-space]",
      exportAs: "nzSpace",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-content></ng-content>
    @for (item of items; track item; let last = $last; let index = $index) {
      <div
        class="ant-space-item"
        [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-container [ngTemplateOutlet]="item"></ng-container>
      </div>
      @if (nzSplit && !last) {
        <span
          class="ant-space-split"
          [style.margin-bottom.px]="nzDirection === 'vertical' ? (last ? null : spaceSize) : null"
          [style.margin-right.px]="nzDirection === 'horizontal' ? (last ? null : spaceSize) : null"
        >
          <ng-template [nzStringTemplateOutlet]="nzSplit" [nzStringTemplateOutletContext]="{ $implicit: index }">{{
            nzSplit
          }}</ng-template>
        </span>
      }
    }
  `,
      host: {
        class: "ant-space",
        "[class.ant-space-horizontal]": 'nzDirection === "horizontal"',
        "[class.ant-space-vertical]": 'nzDirection === "vertical"',
        "[class.ant-space-align-start]": 'mergedAlign === "start"',
        "[class.ant-space-align-end]": 'mergedAlign === "end"',
        "[class.ant-space-align-center]": 'mergedAlign === "center"',
        "[class.ant-space-align-baseline]": 'mergedAlign === "baseline"',
        "[style.flex-wrap]": 'nzWrap ? "wrap" : null'
      },
      imports: [NgTemplateOutlet, NzStringTemplateOutletDirective]
    }]
  }], () => [{
    type: NzConfigService
  }, {
    type: ChangeDetectorRef
  }], {
    nzDirection: [{
      type: Input
    }],
    nzAlign: [{
      type: Input
    }],
    nzSplit: [{
      type: Input
    }],
    nzWrap: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSize: [{
      type: Input
    }],
    items: [{
      type: ContentChildren,
      args: [NzSpaceItemDirective, {
        read: TemplateRef
      }]
    }]
  });
})();
var NzSpaceModule = class _NzSpaceModule {
  static {
    this.ɵfac = function NzSpaceModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NzSpaceModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NzSpaceModule,
      imports: [NzSpaceComponent, NzSpaceItemDirective, NzSpaceCompactComponent],
      exports: [NzSpaceComponent, NzSpaceItemDirective, NzSpaceCompactComponent]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpaceModule, [{
    type: NgModule,
    args: [{
      imports: [NzSpaceComponent, NzSpaceItemDirective, NzSpaceCompactComponent],
      exports: [NzSpaceComponent, NzSpaceItemDirective, NzSpaceCompactComponent]
    }]
  }], null, null);
})();

export {
  NzFormStatusService,
  NzFormNoStatusService,
  NzFormItemFeedbackIconComponent,
  NZ_SPACE_COMPACT_SIZE,
  NZ_SPACE_COMPACT_ITEM_TYPE,
  NzSpaceCompactItemDirective
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v18.2.8
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-F6MZKKRU.js.map
