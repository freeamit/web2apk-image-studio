import test from 'node:test';
import assert from 'node:assert/strict';
import { boundedDimension, safePackageName, verifyUrl, makeConfig } from '../src/core.js';

test('accepts valid image dimensions', () => assert.equal(boundedDimension('1024'), 1024));
test('rejects unsafe dimensions', () => assert.throws(() => boundedDimension(0)));
test('validates Android IDs', () => assert.equal(safePackageName('com.example.myapp'), 'com.example.myapp'));
test('requires HTTPS', () => assert.throws(() => verifyUrl('http://example.com')));
test('generates a valid app configuration', () => assert.equal(makeConfig({name:'My App',url:'https://example.com/a',packageName:'com.example.myapp',themeColor:'#123456'}).websiteOrigin, 'https://example.com'));
